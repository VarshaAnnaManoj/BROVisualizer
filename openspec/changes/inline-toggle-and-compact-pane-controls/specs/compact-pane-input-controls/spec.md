## ADDED Requirements

### Requirement: Pane input controls SHALL use compact widths
The system SHALL reduce pane ID/version input and related control widths and spacing to improve density.

#### Scenario: Compact control strip
- **WHEN** Pre/Post pane headers are rendered
- **THEN** ID/version inputs and action buttons occupy less horizontal space than current baseline while remaining usable

### Requirement: Compact controls SHALL remain usable
The system MUST keep compact controls readable, focusable, and clickable after width reduction.

#### Scenario: Keyboard and pointer interaction
- **WHEN** user navigates or clicks compact controls
- **THEN** controls remain operable and focus indicators remain visible
