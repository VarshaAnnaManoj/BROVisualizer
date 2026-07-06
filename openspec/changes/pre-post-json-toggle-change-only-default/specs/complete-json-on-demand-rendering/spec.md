## ADDED Requirements

### Requirement: Complete JSON SHALL be rendered on demand
The system SHALL render complete pane JSON only when `Complete JSON` mode is selected.

#### Scenario: User requests full JSON
- **WHEN** user toggles from `Change Only` to `Complete JSON`
- **THEN** pane shows the full JSON document for that pane

### Requirement: Mode switching SHALL preserve pane usability
The system MUST keep pane interactions (navigation, focus, updates) functioning after mode changes.

#### Scenario: Switch mode and navigate
- **WHEN** user changes mode and uses path navigation controls
- **THEN** pane remains interactive and highlights/focus continue to behave correctly
