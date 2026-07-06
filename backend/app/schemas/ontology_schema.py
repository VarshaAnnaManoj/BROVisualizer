from datetime import datetime
from typing import Any

from pydantic import BaseModel


class OntologyPayload(BaseModel):
    id: int
    image_url: str | None = None
    location: str | None = None
    ocr_text: str | None = None
    input_json: dict[str, Any]
    output_json: dict[str, Any]
    change_type: str | None = None
    change_description: str | None = None
    change_reason: str | None = None
    validation_notes: str | None = None
    hierarchy_assessment: str | None = None
    ambiguities: str | None = None
    semantic_coverage_status: str | None = None
    change_severity: str | None = None


class MetadataPayload(BaseModel):
    id: int
    input_ontology_id: int | None = None
    input_ocr_id: int | None = None
    input_prompt_id: int | None = None
    output_ontology_id: int | None = None
    created_at: datetime | None = None
    llm_rebuild_diff: bool | None = None
    llm_rebuild_mismatch: bool | None = None
