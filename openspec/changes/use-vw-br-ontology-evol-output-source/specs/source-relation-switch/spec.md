## ADDED Requirements

### Requirement: Ontology output reads use canonical view source
The system SHALL retrieve ontology output data from public.vw_br_ontology_evol_output and SHALL NOT read that data from public.br_ocr_image_repository.

#### Scenario: Repository resolves ontology output from canonical view
- **WHEN** backend repository logic executes ontology output retrieval
- **THEN** the query source MUST be public.vw_br_ontology_evol_output

#### Scenario: Legacy source relation is not used for ontology output
- **WHEN** ontology output APIs are exercised in automated tests
- **THEN** tests MUST verify no ontology output read depends on public.br_ocr_image_repository

### Requirement: Ontology API contract remains stable after source switch
The system SHALL preserve existing ontology endpoint response structure and required fields while switching source relation.

#### Scenario: Endpoint response remains compatible
- **WHEN** a client requests ontology output through existing API routes after the source switch
- **THEN** the response schema and required fields MUST match pre-change contract expectations
