import os
from types import SimpleNamespace

import pytest
from fastapi.testclient import TestClient

os.environ.setdefault("DATABASE_URL", "sqlite+pysqlite:///./backend_test.db")

from app.api import ontology_routes
from app.main import app
from app.models.ontology_model import OntologyEvolution


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
        location=None,
        ocr_text=None,
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


def test_ontology_output_json_uses_output_ontology_result(monkeypatch: pytest.MonkeyPatch) -> None:
    expected_payload = {"Education & Tutoring": {"Academic Tutoring": {"metadata": []}}}
    ontology = _make_ontology(expected_payload)

    monkeypatch.setattr(
        ontology_routes.repository,
        "get_ontology_by_id",
        lambda _db, ontology_id: ontology if ontology_id == 389 else None,
    )

    response = client.get("/api/ontology/389")

    assert response.status_code == 200
    assert response.json()["output_json"] == expected_payload


def test_ontology_output_json_uses_id_and_version_when_provided(monkeypatch: pytest.MonkeyPatch) -> None:
    expected_payload = {"Education & Tutoring": {"Academic Tutoring": {"metadata": []}}}
    ontology = _make_ontology(expected_payload)

    calls: list[tuple[int, str]] = []

    def fake_get_ontology_by_id_and_version(_db: object, ontology_id: int, version: str):
        calls.append((ontology_id, version))
        return ontology if ontology_id == 389 and version == "v1" else None

    monkeypatch.setattr(
        ontology_routes.repository,
        "get_ontology_by_id_and_version",
        fake_get_ontology_by_id_and_version,
    )

    response = client.get("/api/ontology/389?version=v1")

    assert response.status_code == 200
    assert calls == [(389, "v1")]
    assert response.json()["output_json"] == expected_payload


def test_ontology_output_json_returns_404_for_unknown_id_version_pair(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    monkeypatch.setattr(
        ontology_routes.repository,
        "get_ontology_by_id_and_version",
        lambda _db, _id, _version: None,
    )

    response = client.get("/api/ontology/389?version=missing")

    assert response.status_code == 404
    assert response.json()["detail"] == "Ontology record not found for id=389 and version=missing"


def test_ontology_metadata_uses_id_and_version_when_provided(monkeypatch: pytest.MonkeyPatch) -> None:
    ontology = _make_ontology({"x": {}})

    calls: list[tuple[int, str]] = []

    def fake_get_metadata_by_id_and_version(_db: object, ontology_id: int, version: str):
        calls.append((ontology_id, version))
        return ontology if ontology_id == 389 and version == "v1" else None

    monkeypatch.setattr(
        ontology_routes.repository,
        "get_metadata_by_id_and_version",
        fake_get_metadata_by_id_and_version,
    )

    response = client.get("/api/ontology/389/metadata?version=v1")

    assert response.status_code == 200
    assert calls == [(389, "v1")]
    assert response.json()["id"] == 389


def test_ontology_metadata_returns_404_for_unknown_id_version_pair(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    monkeypatch.setattr(
        ontology_routes.repository,
        "get_metadata_by_id_and_version",
        lambda _db, _id, _version: None,
    )

    response = client.get("/api/ontology/389/metadata?version=missing")

    assert response.status_code == 404
    assert response.json()["detail"] == "Metadata not found for id=389 and version=missing"


@pytest.mark.parametrize("raw_value", [None, "not-valid-json", "[]", '"text"'])
def test_ontology_output_json_defensive_parsing(monkeypatch: pytest.MonkeyPatch, raw_value: object) -> None:
    ontology = _make_ontology(raw_value)

    monkeypatch.setattr(
        ontology_routes.repository,
        "get_ontology_by_id",
        lambda _db, ontology_id: ontology if ontology_id == 389 else None,
    )

    response = client.get("/api/ontology/389")

    assert response.status_code == 200
    assert response.json()["output_json"] == {}


def test_ontology_model_uses_public_view_source() -> None:
    assert OntologyEvolution.__tablename__ == "vw_br_ontology_evol_output"
    assert OntologyEvolution.__table__.fullname == "public.vw_br_ontology_evol_output"


def test_ontology_model_does_not_use_legacy_source_relation() -> None:
    assert "br_ocr_image_repository" not in OntologyEvolution.__table__.fullname


def test_ontology_model_columns_match_view_projection() -> None:
    assert set(OntologyEvolution.__table__.columns.keys()) == {
        "id",
        "input_ontology_id",
        "input_ocr_id",
        "input_prompt_id",
        "output_ontology_id",
        "output_ontology_result",
        "location",
        "ocr_text",
        "change_description",
        "change_reason",
        "change_type",
        "hierarchy_assessment",
        "validation_notes",
        "version",
        "created_at",
    }


def test_ontology_response_preserves_required_fields(monkeypatch: pytest.MonkeyPatch) -> None:
    ontology = _make_ontology({"Education": {"Tutoring": {"metadata": []}}})

    monkeypatch.setattr(
        ontology_routes.repository,
        "get_ontology_by_id",
        lambda _db, ontology_id: ontology if ontology_id == 389 else None,
    )

    response = client.get("/api/ontology/389")

    assert response.status_code == 200
    body = response.json()
    assert set(body.keys()) == {
        "id",
        "image_url",
        "location",
        "ocr_text",
        "input_json",
        "output_json",
        "change_type",
        "change_description",
        "change_reason",
        "validation_notes",
        "hierarchy_assessment",
        "ambiguities",
        "semantic_coverage_status",
        "change_severity",
    }


def test_ontology_response_maps_location_to_image_url_and_returns_ocr_text(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    ontology = _make_ontology({"Education": {"Tutoring": {"metadata": []}}})
    ontology.location = "https://cdn.example.com/img-389.png"
    ontology.ocr_text = "Detected text from OCR."

    monkeypatch.setattr(
        ontology_routes.repository,
        "get_ontology_by_id",
        lambda _db, ontology_id: ontology if ontology_id == 389 else None,
    )

    response = client.get("/api/ontology/389")

    assert response.status_code == 200
    body = response.json()
    assert body["location"] == "https://cdn.example.com/img-389.png"
    assert body["image_url"] == "https://cdn.example.com/img-389.png"
    assert body["ocr_text"] == "Detected text from OCR."


def test_ontology_response_sources_change_reason_from_change_reason_column(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    ontology = _make_ontology(
        {
            "Education": {
                "Tutoring": {
                    "change_reason": "JSON value should be ignored",
                }
            }
        }
    )
    ontology.change_description = "Value from change_description column"
    ontology.change_reason = "Value from change_reason column"

    monkeypatch.setattr(
        ontology_routes.repository,
        "get_ontology_by_id",
        lambda _db, ontology_id: ontology if ontology_id == 389 else None,
    )

    response = client.get("/api/ontology/389")

    assert response.status_code == 200
    assert response.json()["change_reason"] == "Value from change_reason column"


def test_ontology_response_prefers_change_reason_over_change_description_when_both_exist(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    ontology = _make_ontology(
        {
            "Education": {
                "Tutoring": {
                    "change_reason": "JSON fallback value should not win",
                }
            }
        }
    )
    ontology.change_description = "Value from change_description"
    ontology.change_reason = "Canonical value from change_reason"

    monkeypatch.setattr(
        ontology_routes.repository,
        "get_ontology_by_id",
        lambda _db, ontology_id: ontology if ontology_id == 389 else None,
    )

    response = client.get("/api/ontology/389")

    assert response.status_code == 200
    assert response.json()["change_reason"] == "Canonical value from change_reason"
