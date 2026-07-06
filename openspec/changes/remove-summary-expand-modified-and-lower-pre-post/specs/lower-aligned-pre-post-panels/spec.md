## ADDED Requirements

### Requirement: Pre/Post Panes SHALL Be Lower-Aligned in Comparison Layout
The comparison layout SHALL position Pre and Post panes lower than their current midway presentation to improve reading flow from controls to content.

#### Scenario: Comparison pane row starts lower
- **WHEN** comparison mode is active
- **THEN** Pre and Post panes SHALL render with lower vertical alignment than the previous layout baseline

### Requirement: Lower Alignment SHALL Preserve Navigation And Highlight Behavior
Layout repositioning SHALL not break existing diff navigation, highlighting, or keyboard interactions.

#### Scenario: Diff button navigation remains functional
- **WHEN** the user clicks or keyboard-activates a Modified diff action
- **THEN** source pane highlight and navigation behavior SHALL remain functional with lowered pane alignment

### Requirement: Responsive Layout SHALL Remain Readable After Repositioning
The lowered Pre/Post alignment SHALL remain readable and usable across desktop and mobile breakpoints.

#### Scenario: Mobile comparison stack remains usable
- **WHEN** viewport width enters mobile breakpoint
- **THEN** lowered alignment styles SHALL adapt without clipping key controls or code-view content
