from deepdiff import DeepDiff

SECTION_KEYS = ("metadata", "explicit_skills", "implicit_skills")
ARRAY_KEY_CANDIDATES = ("id", "uuid", "code", "metadata_name", "name", "skill_name")


def _normalize_path(path: str) -> str:
    cleaned = path.replace("root", "").replace("]['", ".").replace("['", "")
    cleaned = cleaned.replace("']", "").replace("[", ".").replace("]", "")
    return cleaned.strip(".")


def _paths_from_mapping(diff_section: dict) -> set[str]:
    return {_normalize_path(path) for path in diff_section.keys()}


def _paths_from_set(diff_section: set | list | tuple) -> set[str]:
    return {_normalize_path(path) for path in diff_section}


def _path_with_key(path: str, key_name: str, key_value: object) -> str:
    return f"{path}[{key_name}={key_value}]"


def _detect_array_key(pre_items: list, post_items: list) -> str | None:
    all_items = pre_items + post_items
    dict_items = [item for item in all_items if isinstance(item, dict)]
    if len(dict_items) != len(all_items):
        return None

    for candidate in ARRAY_KEY_CANDIDATES:
        pre_values = [item.get(candidate) for item in pre_items]
        post_values = [item.get(candidate) for item in post_items]

        if any(value is None for value in pre_values + post_values):
            continue
        if len(set(pre_values)) != len(pre_values):
            continue
        if len(set(post_values)) != len(post_values):
            continue

        return candidate

    return None


def _emit_missing_node(
    missing_nodes: list[dict[str, str]],
    node_type: str,
    path: str,
    missing_in: str,
) -> None:
    missing_nodes.append({
        "type": node_type,
        "path": path,
        "missing_in": missing_in,
    })


def _compare_generic(
    pre_value: object,
    post_value: object,
    path: str,
    added_paths: set[str],
    removed_paths: set[str],
    modified_paths: set[str],
) -> None:
    if isinstance(pre_value, dict) and isinstance(post_value, dict):
        for key in sorted(set(pre_value.keys()) | set(post_value.keys())):
            next_path = f"{path}.{key}"
            in_pre = key in pre_value
            in_post = key in post_value

            if in_pre and not in_post:
                removed_paths.add(next_path)
                continue
            if in_post and not in_pre:
                added_paths.add(next_path)
                continue

            _compare_generic(pre_value[key], post_value[key], next_path, added_paths, removed_paths, modified_paths)
        return

    if isinstance(pre_value, list) and isinstance(post_value, list):
        _compare_list(pre_value, post_value, path, added_paths, removed_paths, modified_paths)
        return

    if pre_value != post_value:
        modified_paths.add(path)


def _compare_list(
    pre_items: list,
    post_items: list,
    path: str,
    added_paths: set[str],
    removed_paths: set[str],
    modified_paths: set[str],
) -> None:
    key_name = _detect_array_key(pre_items, post_items)

    if key_name:
        pre_map = {item[key_name]: item for item in pre_items}
        post_map = {item[key_name]: item for item in post_items}
        shared_keys = sorted(set(pre_map.keys()) | set(post_map.keys()), key=lambda value: str(value))

        for item_key in shared_keys:
            item_path = _path_with_key(path, key_name, item_key)
            if item_key not in post_map:
                removed_paths.add(item_path)
                continue
            if item_key not in pre_map:
                added_paths.add(item_path)
                continue

            _compare_generic(pre_map[item_key], post_map[item_key], item_path, added_paths, removed_paths, modified_paths)
        return

    max_len = max(len(pre_items), len(post_items))
    for index in range(max_len):
        item_path = f"{path}[{index}]"
        if index >= len(pre_items):
            added_paths.add(item_path)
            continue
        if index >= len(post_items):
            removed_paths.add(item_path)
            continue

        _compare_generic(pre_items[index], post_items[index], item_path, added_paths, removed_paths, modified_paths)


def _compare_service_level(
    pre_service: dict,
    post_service: dict,
    service_path: str,
    added_paths: set[str],
    removed_paths: set[str],
    modified_paths: set[str],
    missing_nodes: list[dict[str, str]],
) -> None:
    # Section arrays are evaluated before any nested item comparison.
    for section in SECTION_KEYS:
        section_path = f"{service_path}.{section}"
        pre_has = section in pre_service
        post_has = section in post_service

        if pre_has and not post_has:
            removed_paths.add(section_path)
            _emit_missing_node(missing_nodes, "missing_section", section_path, "output")
            continue
        if post_has and not pre_has:
            added_paths.add(section_path)
            _emit_missing_node(missing_nodes, "missing_section", section_path, "input")
            continue
        if not pre_has and not post_has:
            continue

        pre_section = pre_service[section]
        post_section = post_service[section]
        _compare_generic(pre_section, post_section, section_path, added_paths, removed_paths, modified_paths)

    other_keys = set(pre_service.keys()) | set(post_service.keys())
    for section in SECTION_KEYS:
        other_keys.discard(section)

    for key in sorted(other_keys):
        key_path = f"{service_path}.{key}"
        in_pre = key in pre_service
        in_post = key in post_service

        if in_pre and not in_post:
            removed_paths.add(key_path)
            continue
        if in_post and not in_pre:
            added_paths.add(key_path)
            continue

        _compare_generic(pre_service[key], post_service[key], key_path, added_paths, removed_paths, modified_paths)


def _build_hierarchical_diff(input_json: dict, output_json: dict) -> dict[str, list]:
    added_paths: set[str] = set()
    removed_paths: set[str] = set()
    modified_paths: set[str] = set()
    missing_nodes: list[dict[str, str]] = []

    domain_names = sorted(set(input_json.keys()) | set(output_json.keys()))
    for domain in domain_names:
        domain_path = f"root.{domain}"
        in_input = domain in input_json
        in_output = domain in output_json

        if in_input and not in_output:
            removed_paths.add(domain_path)
            _emit_missing_node(missing_nodes, "missing_domain_category", domain_path, "output")
            continue
        if in_output and not in_input:
            added_paths.add(domain_path)
            _emit_missing_node(missing_nodes, "missing_domain_category", domain_path, "input")
            continue

        pre_domain = input_json[domain]
        post_domain = output_json[domain]
        if not isinstance(pre_domain, dict) or not isinstance(post_domain, dict):
            _compare_generic(pre_domain, post_domain, domain_path, added_paths, removed_paths, modified_paths)
            continue

        service_names = sorted(set(pre_domain.keys()) | set(post_domain.keys()))
        for service in service_names:
            service_path = f"{domain_path}.{service}"
            service_in_pre = service in pre_domain
            service_in_post = service in post_domain

            if service_in_pre and not service_in_post:
                removed_paths.add(service_path)
                _emit_missing_node(missing_nodes, "missing_service_category", service_path, "output")
                continue
            if service_in_post and not service_in_pre:
                added_paths.add(service_path)
                _emit_missing_node(missing_nodes, "missing_service_category", service_path, "input")
                continue

            pre_service = pre_domain[service]
            post_service = post_domain[service]
            if not isinstance(pre_service, dict) or not isinstance(post_service, dict):
                _compare_generic(pre_service, post_service, service_path, added_paths, removed_paths, modified_paths)
                continue

            _compare_service_level(
                pre_service,
                post_service,
                service_path,
                added_paths,
                removed_paths,
                modified_paths,
                missing_nodes,
            )

    return {
        "added": sorted(path for path in added_paths if path),
        "modified": sorted(path for path in modified_paths if path),
        "deleted": sorted(path for path in removed_paths if path),
        "missing_nodes": sorted(
            missing_nodes,
            key=lambda entry: f"{entry['type']}::{entry['path']}::{entry['missing_in']}",
        ),
    }


def _fallback_deepdiff(input_json: dict, output_json: dict) -> dict[str, list[str]]:
    diff = DeepDiff(input_json, output_json, ignore_order=True)

    added_paths = set()
    removed_paths = set()
    modified_paths = set()

    added_paths |= _paths_from_set(diff.get("dictionary_item_added", set()))
    removed_paths |= _paths_from_set(diff.get("dictionary_item_removed", set()))
    modified_paths |= _paths_from_mapping(diff.get("values_changed", {}))
    modified_paths |= _paths_from_mapping(diff.get("type_changes", {}))

    added_paths |= _paths_from_set(diff.get("iterable_item_added", set()))
    removed_paths |= _paths_from_set(diff.get("iterable_item_removed", set()))

    return {
        "added": sorted(path for path in added_paths if path),
        "modified": sorted(path for path in modified_paths if path),
        "deleted": sorted(path for path in removed_paths if path),
    }


def build_json_diff(input_json: dict, output_json: dict) -> dict[str, list]:
    if isinstance(input_json, dict) and isinstance(output_json, dict):
        return _build_hierarchical_diff(input_json, output_json)

    return _fallback_deepdiff(input_json, output_json)
