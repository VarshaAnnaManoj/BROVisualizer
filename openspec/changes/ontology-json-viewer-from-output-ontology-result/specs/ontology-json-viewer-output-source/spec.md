## ADDED Requirements

### Requirement: Ontology JSON Viewer SHALL use output_ontology_result as source
The system SHALL render the Ontology JSON Viewer content from output_ontology_result stored in public.br_ontology_evol_output via the ontology API response payload.

#### Scenario: Viewer shows ontology JSON from database-backed output field
- **WHEN** the frontend loads ontology data from GET /api/ontology/{id}
- **THEN** the Ontology JSON Viewer SHALL display the response output_json derived from output_ontology_result

#### Scenario: Invalid or missing output payload is handled safely
- **WHEN** output_ontology_result for a requested row is null, invalid JSON, or non-object
- **THEN** the system SHALL return and render an empty JSON object for the viewer instead of failing the request

### Requirement: Viewer data flow SHALL not depend on legacy records endpoint
The system SHALL not require /api/v1/records for Ontology JSON Viewer content.

#### Scenario: Ontology viewer remains functional without legacy endpoint
- **WHEN** /api/v1/records is unavailable or returns 404
- **THEN** the Ontology JSON Viewer SHALL continue to load using /api/ontology/{id} and related ontology metadata endpoints
