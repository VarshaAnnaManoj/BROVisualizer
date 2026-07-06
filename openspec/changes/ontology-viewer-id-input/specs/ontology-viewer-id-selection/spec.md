## ADDED Requirements

### Requirement: User SHALL be able to input ontology ID for viewer retrieval
The system SHALL allow the user to enter an ontology id and request details for that id in the Ontology JSON Viewer.

#### Scenario: Load selected ontology id
- **WHEN** a user enters a valid positive ontology id and triggers load
- **THEN** the frontend SHALL call GET /api/ontology/{id} and render the returned output_json in the Ontology JSON Viewer

### Requirement: Viewer SHALL show metadata for selected ontology id
The system SHALL load and display metadata for the same user-selected ontology id.

#### Scenario: Metadata uses selected id
- **WHEN** a valid ontology id is loaded
- **THEN** the frontend SHALL call GET /api/ontology/{id}/metadata and display metadata values for that same id

### Requirement: Input validation and not-found handling SHALL be explicit
The system SHALL validate user id input and provide clear feedback for invalid or missing records.

#### Scenario: Invalid id input
- **WHEN** a user enters a non-numeric, empty, zero, or negative id
- **THEN** the system SHALL prevent the request and display a validation message

#### Scenario: Requested id not found
- **WHEN** GET /api/ontology/{id} returns 404
- **THEN** the system SHALL show a "record not found" style error while keeping the UI responsive
