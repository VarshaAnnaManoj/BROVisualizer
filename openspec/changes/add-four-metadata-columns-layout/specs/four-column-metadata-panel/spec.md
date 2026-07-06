## ADDED Requirements

### Requirement: Compare view SHALL display four metadata columns in fixed order
The system SHALL render a dedicated metadata section with columns for `change_description`, `hierarchy_assessment`, `validation_notes`, and `change_reason` in that order.

#### Scenario: All metadata fields present
- **WHEN** ontology response contains values for all four metadata fields
- **THEN** the UI shows four labeled columns with the corresponding values in fixed order

### Requirement: Metadata panel SHALL remain visible with compare content
The system MUST keep the four-column metadata section visible as part of the compare screen without removing Pre/Post/Modified panels.

#### Scenario: Compare data loaded
- **WHEN** Pre and Post ontology data are loaded
- **THEN** the metadata columns are rendered alongside compare content and remain accessible
