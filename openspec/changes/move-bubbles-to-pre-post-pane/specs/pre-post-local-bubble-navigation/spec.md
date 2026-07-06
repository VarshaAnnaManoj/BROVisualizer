## ADDED Requirements

### Requirement: Bubble actions SHALL render in respective Pre/Post locations
The system SHALL render Pre-target bubble actions in the Pre pane location and Post-target bubble actions in the Post pane location.

#### Scenario: Source-local placement
- **WHEN** compare mode renders differences
- **THEN** each bubble appears in the pane region that matches its target source (Pre or Post)

### Requirement: Bubble actions MUST preserve existing navigation semantics
The system MUST preserve existing click and keyboard activation behavior so each bubble navigates to the same target path as before.

#### Scenario: Activate source-local bubble
- **WHEN** a user activates a bubble in a pane action strip
- **THEN** the corresponding source pane target path is focused and highlighted as in current behavior

### Requirement: Bubble ordering SHALL remain stable after refresh and re-render
The system SHALL keep deterministic ordering for bubble actions within each pane list when data refreshes or component re-renders occur.

#### Scenario: Re-render with same diff data
- **WHEN** the view re-renders with unchanged diff inputs
- **THEN** bubble order in each pane remains the same

### Requirement: Source-local bubble strips SHALL remain accessible and responsive
The system SHALL keep bubble buttons semantic and keyboard-operable with visible focus/active states, and responsive wrapping on smaller widths.

#### Scenario: Keyboard and responsive usage
- **WHEN** users tab and activate bubbles across viewport sizes
- **THEN** bubbles remain operable, visibly focusable, and layout remains usable without overlap
