## ADDED Requirements

### Requirement: Metadata panel SHALL minimize unused shaded area
The system SHALL reduce visible empty space in the metadata panel region through tighter spacing and improved fill of available panel area.

#### Scenario: Dense right-side panel rendering
- **WHEN** the compare page is rendered on desktop
- **THEN** the metadata panel does not show excessive blank/shaded space relative to its content

### Requirement: Panel spacing SHALL be consistently compact
The system MUST apply compact, consistent gaps and padding between metadata cards and container boundaries.

#### Scenario: Compact spacing across cards
- **WHEN** four metadata cards are displayed
- **THEN** card spacing and panel padding follow compact values without collapsing readability
