import os
from types import SimpleNamespace

import pytest
from fastapi.testclient import TestClient

os.environ.setdefault("DATABASE_URL", "sqlite+pysqlite:///./backend_test.db")

from app.api import ontology_routes
from app.main import app
from app.utils.json_diff import build_json_diff


client = TestClient(app)


def _make_ontology(output_ontology_result: object) -> SimpleNamespace:
    return SimpleNamespace(
        id=389,
        input_ontology_id=None,
        input_ocr_id=None,
        input_prompt_id=None,
        output_ontology_id=None,
        created_at=None,
        llm_rebuild_diff=None,
        llm_rebuild_mismatch=None,
        output_ontology_result=output_ontology_result,
        change_type=None,
        change_description=None,
        change_reason=None,
        validation_notes=None,
        hierarchy_assessment=None,
        ambiguities=None,
        semantic_coverage_status=None,
        change_severity=None,
    )


@pytest.fixture(autouse=True)
def override_get_db() -> None:
    app.dependency_overrides[ontology_routes.get_db] = lambda: object()
    yield
    app.dependency_overrides.clear()


def test_missing_domain_short_circuits_descendants() -> None:
    pre = {
        "Education": {
            "Tutoring": {
                "metadata": [{"metadata_name": "grade", "value": "10"}],
                "explicit_skills": [{"name": "teaching"}],
            }
        }
    }
    post: dict[str, object] = {}

    diff = build_json_diff(pre, post)

    assert diff["deleted"] == ["root.Education"]
    assert not any(path.startswith("root.Education.Tutoring") for path in diff["deleted"])
    assert diff["missing_nodes"] == [
        {
            "type": "missing_domain_category",
            "path": "root.Education",
            "missing_in": "output",
        }
    ]


def test_missing_service_short_circuits_sections_and_items() -> None:
    pre = {
        "Home": {
            "Cleaning": {"metadata": [{"metadata_name": "duration", "value": "60"}]},
            "Plumbing": {"metadata": [{"metadata_name": "tools", "value": "basic"}]},
        }
    }
    post = {
        "Home": {
            "Cleaning": {"metadata": [{"metadata_name": "duration", "value": "60"}]},
        }
    }

    diff = build_json_diff(pre, post)

    assert "root.Home.Plumbing" in diff["deleted"]
    assert not any(path.startswith("root.Home.Plumbing.metadata") for path in diff["deleted"])
    assert {
        "type": "missing_service_category",
        "path": "root.Home.Plumbing",
        "missing_in": "output",
    } in diff["missing_nodes"]


def test_missing_section_reports_once_without_child_noise() -> None:
    pre = {
        "Home": {
            "Cleaning": {
                "metadata": [{"metadata_name": "duration", "value": "60"}],
                "explicit_skills": [{"name": "vacuum"}],
                "implicit_skills": [{"name": "organization"}],
            }
        }
    }
    post = {
        "Home": {
            "Cleaning": {
                "explicit_skills": [{"name": "vacuum"}],
                "implicit_skills": [{"name": "organization"}],
            }
        }
    }

    diff = build_json_diff(pre, post)

    assert "root.Home.Cleaning.metadata" in diff["deleted"]
    assert not any(path.startswith("root.Home.Cleaning.metadata[") for path in diff["deleted"])
    assert {
        "type": "missing_section",
        "path": "root.Home.Cleaning.metadata",
        "missing_in": "output",
    } in diff["missing_nodes"]


def test_item_level_diff_is_emitted_when_parents_exist() -> None:
    pre = {
        "Home": {
            "Cleaning": {
                "metadata": [{"metadata_name": "duration", "value": "60"}],
            }
        }
    }
    post = {
        "Home": {
            "Cleaning": {
                "metadata": [{"metadata_name": "duration", "value": "90"}],
            }
        }
    }

    diff = build_json_diff(pre, post)

    assert any(path.endswith(".value") for path in diff["modified"])
    assert any(path.startswith("root.Home.Cleaning.metadata") for path in diff["modified"])


def test_diff_endpoint_exposes_missing_nodes_and_parent_only_paths(monkeypatch: pytest.MonkeyPatch) -> None:
    payload = {
        "Home": {
            "Cleaning": {
                "metadata": [{"metadata_name": "duration", "value": "60"}],
                "explicit_skills": [{"name": "vacuum"}],
            }
        }
    }
    ontology = _make_ontology(payload)

    monkeypatch.setattr(
        ontology_routes.repository,
        "get_ontology_by_id",
        lambda _db, ontology_id: ontology if ontology_id == 389 else None,
    )

    response = client.get("/api/ontology/389/diff")

    assert response.status_code == 200
    body = response.json()
    assert body["added"] == ["root.Home"]
    assert not any(path.startswith("root.Home.Cleaning") for path in body["added"])
    assert body["missing_nodes"] == [
        {
            "type": "missing_domain_category",
            "path": "root.Home",
            "missing_in": "input",
        }
    ]
