## ADDED Requirements

### Requirement: Presence Diff Buttons SHALL Use Under-Badge Space
The system SHALL render useful path/value content in the area beneath PRE ONLY and POST ONLY badges inside presence diff buttons.

#### Scenario: PRE ONLY button fills under-badge area
- **WHEN** a PRE ONLY presence diff entry is rendered
- **THEN** the button SHALL show concise path/value content beneath or directly aligned under the badge without large empty whitespace

#### Scenario: POST ONLY button fills under-badge area
- **WHEN** a POST ONLY presence diff entry is rendered
- **THEN** the button SHALL show concise path/value content beneath or directly aligned under the badge without large empty whitespace

### Requirement: Under-Badge Layout SHALL Preserve Label Clarity
Using under-badge space SHALL keep content readable and unambiguous.

#### Scenario: Path and value remain distinguishable
- **WHEN** under-badge text is displayed
- **THEN** path hint and value preview SHALL remain visually distinguishable within the button
