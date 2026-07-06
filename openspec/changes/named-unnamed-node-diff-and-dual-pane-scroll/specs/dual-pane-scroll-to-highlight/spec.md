## ADDED Requirements

### Requirement: Diff Navigation SHALL Scroll Both Source Panes
When a user activates a Modified entry action, the system SHALL scroll both Pre and Post panes to corresponding highlighted locations.

#### Scenario: Changed value navigation scrolls both panes
- **WHEN** a user activates a changed-value entry from Modified Ontology
- **THEN** both Pre and Post viewers SHALL scroll to the highlighted target for the selected path lineage

#### Scenario: Presence difference scrolls available pane and paired context pane
- **WHEN** a user activates a Pre-only or Post-only entry
- **THEN** the source pane containing the exact target SHALL scroll to highlight and the other pane SHALL scroll to nearest valid lineage fallback if available

### Requirement: Dual Scroll SHALL Preserve Visibility and Focus Context
The system SHALL keep source target metadata and highlight visibility synchronized after dual-pane navigation.

#### Scenario: After scroll, highlight remains visible in both panes
- **WHEN** dual-pane scrolling completes for a selected entry
- **THEN** highlighted regions in both panes SHALL remain visible within viewport and path metadata SHALL reflect the selected entry

#### Scenario: Keyboard activation triggers same dual-scroll behavior
- **WHEN** the user activates navigation via keyboard (Enter/Space)
- **THEN** the system SHALL execute the same dual-pane scroll and highlighting behavior as pointer activation
