import json

from app.models.ontology_model import OntologyEvolution
from app.schemas.response_schema import OntologyRecordResponse
from app.utils.json_filter import parse_json_object


def _as_text(value: object) -> str | None:
    if value is None:
        return None
    if isinstance(value, str):
        return value
    try:
        return json.dumps(value)
    except TypeError:
        return str(value)


class OntologyService:
    def build_ontology_response(
        self,
        ontology: OntologyEvolution,
    ) -> OntologyRecordResponse:
        input_json = {}
        output_json = parse_json_object(ontology.output_ontology_result)
        location_value = _as_text(getattr(ontology, "location", None))
        ocr_text_value = _as_text(getattr(ontology, "ocr_text", None))

        return OntologyRecordResponse(
            id=ontology.id,
            image_url=location_value,
            location=location_value,
            ocr_text=ocr_text_value,
            input_json=input_json,
            output_json=output_json,
            change_type=_as_text(ontology.change_type),
            change_description=_as_text(ontology.change_description),
            change_reason=_as_text(getattr(ontology, "change_reason", None)),
            validation_notes=_as_text(getattr(ontology, "validation_notes", None)),
            hierarchy_assessment=_as_text(getattr(ontology, "hierarchy_assessment", None)),
            ambiguities=_as_text(getattr(ontology, "ambiguities", None)),
            semantic_coverage_status=_as_text(getattr(ontology, "semantic_coverage_status", None)),
            change_severity=_as_text(getattr(ontology, "change_severity", None)),
        )
