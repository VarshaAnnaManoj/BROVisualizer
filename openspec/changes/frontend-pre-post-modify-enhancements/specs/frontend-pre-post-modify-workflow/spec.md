## ADDED Requirements

### Requirement: Section workflow parity across Pre, Post, and Modified
The system SHALL provide the same interaction workflow for `Pre`, `Post`, and `Modified Ontology` sections, including input editing, submit, retry, validation feedback, and result rendering.

#### Scenario: All sections expose matching controls
- **WHEN** the user opens comparison mode
- **THEN** each section presents ontology id input, version input, load action, retry action, and JSON output area

### Requirement: Section-level isolation
The system SHALL keep each section state isolated so actions or failures in one section do not reset or mutate the other sections.

#### Scenario: Failed section does not reset successful sections
- **WHEN** one section returns not found or validation error while others have successful data
- **THEN** successful sections remain visible and unchanged
- **THEN** only the failed section displays remediation feedback

### Requirement: Consistent endpoint usage for all sections
The system SHALL request ontology data for each section using the existing frontend ontology endpoint pattern with that section's `(id, version)` pair.

#### Scenario: Section-specific request parameters are respected
- **WHEN** the user submits distinct values across Pre, Post, and Modified sections
- **THEN** each section sends a request with its own id and version values
- **THEN** each section renders response data from its own request

### Requirement: Three-section responsive readability
The system SHALL preserve usability of Pre, Post, and Modified sections across desktop and mobile breakpoints.

#### Scenario: Mobile layout remains usable
- **WHEN** the viewport is reduced to mobile width
- **THEN** the three sections are presented in a readable stacked or otherwise non-overlapping layout
- **THEN** section controls remain operable without horizontal clipping
