## ADDED Requirements

### Requirement: Modified Ontology set is available in comparison view
The system SHALL provide an additional set labeled `Modified Ontology` alongside existing `Pre` and `Post` sets in the ontology comparison interface.

#### Scenario: Three sets render together
- **WHEN** the user opens the ontology comparison view
- **THEN** the UI displays sections for `Pre`, `Post`, and `Modified Ontology`
- **THEN** each section includes id/version inputs and a JSON result area

### Requirement: Modified Ontology uses independent id/version inputs
The system SHALL maintain independent input state for `Modified Ontology` and SHALL NOT mutate `Pre` or `Post` inputs when Modified Ontology values change.

#### Scenario: Modified input isolation
- **WHEN** the user edits `Modified Ontology` id or version
- **THEN** `Pre` and `Post` inputs remain unchanged
- **THEN** no `Pre` or `Post` request is triggered by modified-only input edits

### Requirement: Modified Ontology retrieval uses existing API contract
The system SHALL retrieve Modified Ontology JSON using existing ontology endpoints with the Modified Ontology `(id, version)` pair.

#### Scenario: Modified Ontology successful retrieval
- **WHEN** the user submits a valid `Modified Ontology` id/version pair
- **THEN** the system requests ontology data using that pair
- **THEN** the `Modified Ontology` section renders the returned JSON payload

### Requirement: Modified Ontology validation and errors are localized
The system SHALL validate and handle loading/error states for `Modified Ontology` independently from `Pre` and `Post`.

#### Scenario: Modified Ontology validation prevents invalid request
- **WHEN** the user submits `Modified Ontology` with missing id or missing version
- **THEN** the UI shows a validation message in the `Modified Ontology` section
- **THEN** no network request is sent for that section

#### Scenario: Modified Ontology failure does not block Pre/Post
- **WHEN** `Pre` and `Post` are loaded successfully and `Modified Ontology` returns not found
- **THEN** `Pre` and `Post` remain visible with their loaded results
- **THEN** the `Modified Ontology` section shows an error and retry action
- **THEN** retrying `Modified Ontology` does not reset loaded `Pre` or `Post` data
