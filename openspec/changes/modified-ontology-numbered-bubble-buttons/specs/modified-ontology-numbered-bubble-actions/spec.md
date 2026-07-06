## ADDED Requirements

### Requirement: Modified Ontology differences SHALL render numbered bubble actions
The system SHALL render each difference entry in the Modified Ontology panel with an ordered numbered bubble action so users can quickly scan and select differences.

#### Scenario: Sequential bubble rendering
- **WHEN** the Modified Ontology list is rendered with multiple difference entries
- **THEN** each entry shows a numbered bubble action with ascending order starting at 1

### Requirement: Numbered bubbles MUST preserve current navigation behavior
The system MUST preserve existing navigation and targeting behavior when a numbered bubble action is activated.

#### Scenario: Activate numbered bubble
- **WHEN** a user activates a numbered bubble for a difference entry
- **THEN** the system navigates and highlights the same target path currently associated with that entry

### Requirement: Numbered bubbles SHALL remain accessible and stateful
The system SHALL keep each numbered bubble keyboard-focusable, semantically interactive, and visually stateful for active and focused states.

#### Scenario: Keyboard and focus behavior
- **WHEN** a user tabs to and activates a numbered bubble action
- **THEN** the action is operable by keyboard and provides visible focus and active-state indication

### Requirement: Difference context MUST remain understandable with bubble actions
The system MUST display readable context adjacent to each numbered bubble so users can identify what each index corresponds to.

#### Scenario: Bubble with context label
- **WHEN** a numbered bubble action is displayed
- **THEN** a readable label or concise summary for that difference is visible in the same action row
