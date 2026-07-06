## ADDED Requirements

### Requirement: Restore Pre/Post full JSON viewer format
The system SHALL display Pre and Post source panes using the prior full JSON viewer format rather than path-row source rendering.

#### Scenario: Pre/Post panes render full JSON blocks
- **WHEN** comparison mode loads source data for Pre and Post
- **THEN** each source pane shows a complete JSON text block for its payload
- **THEN** source panes no longer require path-row entry rendering

### Requirement: Modified entry-to-source navigation remains available
The system SHALL keep Modified Ontology entries actionable so users can navigate to the corresponding source pane where the change originates.

#### Scenario: PRE ONLY entry routes to Pre source pane
- **WHEN** the user activates a `PRE ONLY` entry in Modified Ontology
- **THEN** the Pre source pane is focused and marked active for that entry path

#### Scenario: POST ONLY entry routes to Post source pane
- **WHEN** the user activates a `POST ONLY` entry in Modified Ontology
- **THEN** the Post source pane is focused and marked active for that entry path

### Requirement: Roundtrip return to Modified Ontology
The system SHALL provide an explicit action to return from source JSON context back to the Modified Ontology pane.

#### Scenario: Return control restores Modified focus
- **WHEN** a user has navigated to Pre or Post source context from a Modified entry
- **THEN** a visible return action is available
- **THEN** activating it returns focus/context to Modified Ontology

### Requirement: Changed-entry dual routing is preserved
The system SHALL continue to expose both Pre and Post navigation actions for changed-value entries.

#### Scenario: Changed entry supports both destinations
- **WHEN** a changed path is displayed in Modified Ontology
- **THEN** the row includes one action for Pre source and one action for Post source
- **THEN** each action routes to the corresponding source pane context for that same path

### Requirement: Keyboard-operable navigation and return controls
The system SHALL keep entry navigation and return-to-Modified controls keyboard accessible.

#### Scenario: Keyboard roundtrip navigation
- **WHEN** a keyboard user tabs to a Modified entry action and activates it with Enter or Space
- **THEN** source pane focus/context updates
- **THEN** the user can tab to and activate the return control to go back to Modified Ontology
