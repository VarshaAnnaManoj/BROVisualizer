## ADDED Requirements

### Requirement: Source Panes SHALL Expand Content Area Vertically
In comparison mode, Pre and Post source panes SHALL prioritize vertical space for JSON viewer content so panes extend downward with minimal empty area.

#### Scenario: Active source state preserves vertical content emphasis
- **WHEN** a diff target is activated and source panes are highlighted
- **THEN** each source pane SHALL keep a visibly larger JSON viewing area than banner/control area

#### Scenario: Comparison layout remains readable while panes extend downward
- **WHEN** users inspect long JSON content in comparison mode
- **THEN** source panes SHALL present extended vertical space that reduces apparent empty lower-page gaps

### Requirement: Vertical Fill SHALL Remain Responsive
Source pane vertical-fill behavior SHALL remain usable across desktop and mobile breakpoints.

#### Scenario: Mobile breakpoint preserves readable pane structure
- **WHEN** viewport width matches mobile/tablet breakpoints
- **THEN** source panes SHALL maintain readable layout and scrollable JSON content without clipping active path context
