from typing import Any

from pydantic import BaseModel, Field

from app.schemas.ontology_schema import MetadataPayload, OntologyPayload


class HealthResponse(BaseModel):
    status: str


class OntologyRecordResponse(OntologyPayload):
    pass


class MissingNodeEntry(BaseModel):
    type: str
    path: str
    missing_in: str


class DiffResponse(BaseModel):
    added: list[str]
    modified: list[str]
    deleted: list[str]
    missing_nodes: list[MissingNodeEntry] = Field(default_factory=list)


class ChangesResponse(BaseModel):
    changes: dict[str, Any]


class MetadataResponse(MetadataPayload):
    pass
