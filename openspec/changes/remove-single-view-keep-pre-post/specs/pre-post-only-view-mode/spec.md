## ADDED Requirements

### Requirement: Comparison view SHALL be the only available viewer mode
The system SHALL provide only the Pre/Post comparison interface and MUST NOT expose a Single viewer mode control or route.

#### Scenario: Toolbar mode controls
- **WHEN** the dashboard toolbar is rendered
- **THEN** the UI shows Pre/Post comparison controls only and does not show a Single mode option

#### Scenario: Initial page render
- **WHEN** the user opens the dashboard
- **THEN** the Pre and Post panes plus Modified pane are visible by default

### Requirement: Comparison mode SHALL initialize without mode switching
The system MUST initialize directly into comparison state without requiring any user mode selection.

#### Scenario: First-load interaction
- **WHEN** data loads after the dashboard mounts
- **THEN** pane-level compare workflow remains active without any mode toggle interaction
