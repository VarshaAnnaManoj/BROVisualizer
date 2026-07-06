## ADDED Requirements

### Requirement: Pre/Post panes SHALL provide a two-option viewer mode toggle
The system SHALL render a toggle at the top of each Pre and Post JSON pane with options `Change Only` and `Complete JSON`.

#### Scenario: Toggle visible on pane header
- **WHEN** the compare view is rendered
- **THEN** each Pre/Post pane shows a two-option viewer mode toggle

### Requirement: Toggle selection SHALL switch pane rendering mode
The system MUST update the pane JSON view based on the selected toggle option.

#### Scenario: User switches to complete view
- **WHEN** user selects `Complete JSON`
- **THEN** the pane renders full JSON for that pane
