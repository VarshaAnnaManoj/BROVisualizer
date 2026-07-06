## ADDED Requirements

### Requirement: Button-based diff entries in Modified Ontology
The system SHALL render each Modified Ontology diff entry as an interactive button rather than static text.

#### Scenario: Presence entry is rendered as a button
- **WHEN** the Modified Ontology pane displays a `PRE ONLY` or `POST ONLY` diff entry
- **THEN** the entry is shown as a clickable button with path and source context

### Requirement: Unified view for PRE ONLY and POST ONLY
The system SHALL display both `PRE ONLY` and `POST ONLY` entries in the same diff window while preserving clear source labeling.

#### Scenario: Combined list contains both categories
- **WHEN** both `PRE ONLY` and `POST ONLY` entries exist in the current comparison
- **THEN** they are visible together in one diff list container
- **THEN** each entry indicates whether it belongs to Pre or Post source

### Requirement: Source-aware navigation on click
The system SHALL navigate from a clicked Modified Ontology entry to the corresponding source JSON viewer and path.

#### Scenario: PRE ONLY entry routes to Pre viewer
- **WHEN** the user clicks a `PRE ONLY` entry button in Modified Ontology
- **THEN** the Pre JSON viewer is focused and scrolled to the entry path

#### Scenario: POST ONLY entry routes to Post viewer
- **WHEN** the user clicks a `POST ONLY` entry button in Modified Ontology
- **THEN** the Post JSON viewer is focused and scrolled to the entry path

### Requirement: Changed entries support dual navigation
The system SHALL allow changed-value rows to navigate independently to Pre and Post source paths.

#### Scenario: Changed row exposes both source targets
- **WHEN** a changed path is shown in Modified Ontology
- **THEN** the row provides a Pre-target action and a Post-target action
- **THEN** each action navigates to the same path in its respective JSON viewer

### Requirement: Navigation feedback and accessibility
The system SHALL provide visible active-state feedback and keyboard-operable controls for diff entry navigation.

#### Scenario: Active target is visually indicated
- **WHEN** a user activates a diff entry button
- **THEN** the selected entry and/or destination context is visually highlighted until another target is selected

#### Scenario: Keyboard activation is supported
- **WHEN** a user navigates to diff entry buttons via keyboard
- **THEN** Enter or Space activates navigation to the corresponding source viewer path
