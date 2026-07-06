## ADDED Requirements

### Requirement: Missing metadata values SHALL render deterministic placeholders
The system SHALL render a consistent placeholder for each missing/null metadata field value.

#### Scenario: One or more fields missing
- **WHEN** any of `change_description`, `hierarchy_assessment`, `validation_notes`, or `change_reason` is null, empty, or absent
- **THEN** that column shows the configured placeholder instead of blank space

### Requirement: Metadata values SHALL be normalized before display
The system MUST safely convert non-string metadata values into displayable text without runtime errors.

#### Scenario: Non-string response value
- **WHEN** a metadata field arrives as a non-string serializable value
- **THEN** the UI displays a normalized string representation and remains stable
