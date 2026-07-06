from typing import Any

from fastapi import APIRouter, Depends, HTTPException, Path, Query
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.repositories.ontology_repository import OntologyRepository
from app.schemas.response_schema import DiffResponse, MetadataResponse, OntologyRecordResponse
from app.services.diff_service import DiffService
from app.services.metadata_service import MetadataService
from app.services.ontology_service import OntologyService
from app.utils.json_filter import extract_changed_nodes, parse_json_object

router = APIRouter(prefix="/api/ontology", tags=["ontology"])

repository = OntologyRepository()
ontology_service = OntologyService()
diff_service = DiffService()
metadata_service = MetadataService()


def _get_ontology_or_404(db: Session, ontology_id: int, version: str | None = None):
    if version is None:
        ontology = repository.get_ontology_by_id(db, ontology_id)
    else:
        ontology = repository.get_ontology_by_id_and_version(db, ontology_id, version)
    if ontology is None:
        if version is None:
            detail = f"Ontology record not found for id={ontology_id}"
        else:
            detail = f"Ontology record not found for id={ontology_id} and version={version}"
        raise HTTPException(status_code=404, detail=detail)
    return ontology


@router.get("/{id}", response_model=OntologyRecordResponse)
def get_ontology_record(
    id: int = Path(..., gt=0),
    version: str | None = Query(default=None, min_length=1),
    db: Session = Depends(get_db),
) -> OntologyRecordResponse:
    ontology = _get_ontology_or_404(db, id, version)
    return ontology_service.build_ontology_response(ontology)


@router.get("/{id}/diff", response_model=DiffResponse)
def get_ontology_diff(
    id: int = Path(..., gt=0),
    version: str | None = Query(default=None, min_length=1),
    db: Session = Depends(get_db),
) -> DiffResponse:
    ontology = _get_ontology_or_404(db, id, version)
    input_json = {}
    output_json = parse_json_object(ontology.output_ontology_result)
    return diff_service.generate_diff(input_json, output_json)


@router.get("/{id}/changes", response_model=dict[str, Any])
def get_ontology_changes(
    id: int = Path(..., gt=0),
    version: str | None = Query(default=None, min_length=1),
    db: Session = Depends(get_db),
) -> dict[str, Any]:
    ontology = _get_ontology_or_404(db, id, version)
    input_json = {}
    output_json = parse_json_object(ontology.output_ontology_result)
    return extract_changed_nodes(input_json, output_json)


@router.get("/{id}/metadata", response_model=MetadataResponse)
def get_ontology_metadata(
    id: int = Path(..., gt=0),
    version: str | None = Query(default=None, min_length=1),
    db: Session = Depends(get_db),
) -> MetadataResponse:
    if version is None:
        ontology = repository.get_metadata(db, id)
    else:
        ontology = repository.get_metadata_by_id_and_version(db, id, version)
    if ontology is None:
        if version is None:
            detail = f"Metadata not found for id={id}"
        else:
            detail = f"Metadata not found for id={id} and version={version}"
        raise HTTPException(status_code=404, detail=detail)
    return metadata_service.build_metadata_response(ontology)
