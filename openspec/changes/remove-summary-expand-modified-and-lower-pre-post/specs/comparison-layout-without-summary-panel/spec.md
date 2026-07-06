## ADDED Requirements

### Requirement: Comparison Mode SHALL Omit Transformation Summary Panel
When the viewer is in comparison mode, the system SHALL not render the Transformation Summary panel.

#### Scenario: Comparison mode hides summary panel
- **WHEN** the user switches to Pre/Post comparison mode
- **THEN** the Transformation Summary panel SHALL be absent from the comparison layout

### Requirement: Modified Ontology Pane SHALL Expand Into Freed Summary Space
After summary panel removal in comparison mode, the layout SHALL allocate the freed space to the comparison pane structure with Modified Ontology receiving expanded area.

#### Scenario: Modified pane uses recovered layout area
- **WHEN** comparison mode is active and summary panel is removed
- **THEN** Modified Ontology pane SHALL expand to occupy recovered layout space

#### Scenario: Single mode retains summary availability
- **WHEN** the user is in single-view mode
- **THEN** summary panel behavior SHALL remain available according to existing single-mode layout
