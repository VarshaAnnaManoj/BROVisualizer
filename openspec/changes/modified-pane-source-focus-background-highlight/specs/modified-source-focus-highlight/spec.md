## ADDED Requirements

### Requirement: Modified Navigation SHALL Focus Source Section Context
When a user activates a navigation action in the Modified Ontology pane, the system SHALL focus the corresponding source viewer section for the selected pane and path context.

#### Scenario: Pre-only entry routes to Pre viewer focus context
- **WHEN** the user activates a PRE ONLY entry in Modified Ontology
- **THEN** the Pre source viewer SHALL become the active focused source context and display the selected path metadata

#### Scenario: Post-only entry routes to Post viewer focus context
- **WHEN** the user activates a POST ONLY entry in Modified Ontology
- **THEN** the Post source viewer SHALL become the active focused source context and display the selected path metadata

#### Scenario: Changed entry preserves explicit source target
- **WHEN** the user activates the Pre action or Post action for a changed entry
- **THEN** the system SHALL focus the selected source pane context matching the chosen action

### Requirement: Active Source Context SHALL Use Distinct Background Highlighting
The system SHALL apply a distinct background-highlight visual treatment to the active source section context whenever navigation from Modified Ontology is active.

#### Scenario: Active source context highlight is visible
- **WHEN** source navigation is active for either Pre or Post viewer
- **THEN** the active source section SHALL render with a distinct background style that is visually different from inactive state

#### Scenario: Highlight remains until explicit state change
- **WHEN** source navigation is active and the user has not returned to Modified Ontology or selected a new target
- **THEN** the active source highlight SHALL remain visible

### Requirement: Roundtrip Return SHALL Clear Source Focus State
The system SHALL provide a Back to Modified Ontology control that clears active source focus/highlight state and returns user context to Modified Ontology.

#### Scenario: Return action clears source highlight and focus state
- **WHEN** the user activates Back to Modified Ontology from an active source context
- **THEN** the active source pane highlight/context SHALL be cleared and focus context SHALL return to Modified Ontology

#### Scenario: Return action is keyboard operable
- **WHEN** keyboard users activate Back to Modified Ontology with Enter or Space
- **THEN** the system SHALL perform the same return behavior as pointer activation
