## ADDED Requirements

### Requirement: Pane viewer toggles SHALL render inline on one row
The system SHALL render `Change Only` and `Complete JSON` controls in a single horizontal row for each Pre/Post pane in normal desktop view.

#### Scenario: Desktop pane controls
- **WHEN** the compare page is shown on desktop width
- **THEN** each pane displays both toggle options on one line without vertical stacking

### Requirement: Inline toggle SHALL retain clear selected state
The system MUST preserve selected-state semantics and visual indication while toggles remain inline.

#### Scenario: Toggle selection state
- **WHEN** user switches viewer mode
- **THEN** selected mode remains visibly active and accessible via semantic state attributes
