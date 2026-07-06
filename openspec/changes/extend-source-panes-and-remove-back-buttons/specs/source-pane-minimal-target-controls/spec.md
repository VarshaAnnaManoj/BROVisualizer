## ADDED Requirements

### Requirement: Source Target Banners SHALL Omit Redundant Back Buttons
When source target banners are shown in Pre and Post panes, the UI SHALL not render duplicate per-pane “Back to Modified Ontology” buttons.

#### Scenario: Pre and Post active banners render without back buttons
- **WHEN** source panes show an active focused path banner
- **THEN** neither Pre nor Post banner SHALL include a “Back to Modified Ontology” button

### Requirement: Navigation Semantics SHALL Remain Intact After Control Removal
Removing redundant source-pane buttons SHALL not break highlight or navigation behavior triggered from Modified diff actions.

#### Scenario: Modified diff action still focuses and highlights sources
- **WHEN** user selects a diff navigation action from Modified pane
- **THEN** source panes SHALL still focus and highlight the requested path correctly

#### Scenario: Accessible context remains available without per-pane buttons
- **WHEN** active source state is displayed
- **THEN** focused path context SHALL remain visible and screen-readable in source target banners
