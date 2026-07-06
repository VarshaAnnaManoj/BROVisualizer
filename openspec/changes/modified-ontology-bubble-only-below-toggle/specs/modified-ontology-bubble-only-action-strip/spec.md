## ADDED Requirements

### Requirement: Modified Ontology SHALL render bubble-only actions below Change Only controls
The system SHALL render an ordered bubble action strip in the Modified Ontology area directly below the Change Only controls.

#### Scenario: Bubble strip placement
- **WHEN** the comparison view is displayed
- **THEN** bubble actions appear directly below Change Only controls in the Modified Ontology panel

### Requirement: Modified Ontology MUST remove descriptive difference content
The system MUST remove difference description text, section labels, and detailed path/value content from the Modified Ontology display.

#### Scenario: No difference descriptions
- **WHEN** differences are present
- **THEN** only bubble actions are shown and descriptive difference content is not rendered

### Requirement: Bubble actions SHALL preserve navigation and accessibility behavior
The system SHALL keep each bubble as an operable action that preserves existing target navigation behavior and accessible semantics.

#### Scenario: Activate bubble action
- **WHEN** a user clicks or keyboard-activates a bubble
- **THEN** the same target path navigation and highlighting behavior occurs as before

### Requirement: Bubble strip SHALL keep stable ordering and responsive usability
The system SHALL maintain stable bubble ordering for rendered actions and remain usable on narrower layouts.

#### Scenario: Ordered responsive bubbles
- **WHEN** the action list is rendered across viewport sizes
- **THEN** bubbles remain in stable order and stay visible/operable with responsive wrapping
