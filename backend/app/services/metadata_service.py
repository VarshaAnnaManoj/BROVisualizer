from app.models.ontology_model import OntologyEvolution
from app.schemas.response_schema import MetadataResponse


class MetadataService:
    def build_metadata_response(self, ontology: OntologyEvolution) -> MetadataResponse:
        return MetadataResponse(
            id=ontology.id,
            input_ontology_id=ontology.input_ontology_id,
            input_ocr_id=ontology.input_ocr_id,
            input_prompt_id=ontology.input_prompt_id,
            output_ontology_id=ontology.output_ontology_id,
            created_at=ontology.created_at,
            llm_rebuild_diff=getattr(ontology, "llm_rebuild_diff", None),
            llm_rebuild_mismatch=getattr(ontology, "llm_rebuild_mismatch", None),
        )
