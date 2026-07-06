import json
from typing import Any


def parse_json_object(raw_value: Any) -> dict[str, Any]:
    if isinstance(raw_value, dict):
        return raw_value
    if not raw_value:
        return {}
    if isinstance(raw_value, str):
        try:
            parsed = json.loads(raw_value)
            return parsed if isinstance(parsed, dict) else {}
        except json.JSONDecodeError:
            return {}
    return {}


def extract_changed_nodes(input_json: dict[str, Any], output_json: dict[str, Any]) -> dict[str, Any]:
    changes: dict[str, Any] = {}

    for key, out_value in output_json.items():
        if key not in input_json:
            changes[key] = out_value
            continue

        in_value = input_json[key]
        if isinstance(in_value, dict) and isinstance(out_value, dict):
            nested = extract_changed_nodes(in_value, out_value)
            if nested:
                changes[key] = nested
            continue

        if in_value != out_value:
            changes[key] = out_value

    return changes
