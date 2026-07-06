## ADDED Requirements

### Requirement: Diff Buttons SHALL Present Concise Visual Labels
The system SHALL render concise visual labels for diff navigation buttons so users can quickly understand target context without excessive whitespace.

#### Scenario: Long path is condensed for visual display
- **WHEN** a diff entry path is long
- **THEN** the visible button label SHALL show a concise path representation instead of the full unbounded path string

#### Scenario: Accessibility retains full path context
- **WHEN** concise visual labeling is applied
- **THEN** the button accessible name SHALL preserve full navigation intent context

### Requirement: Diff Button Content SHALL Stay Clear
The system SHALL keep source badge, concise path hint, and value preview readable and semantically separated in the button layout.

#### Scenario: Presence difference button renders concise structure
- **WHEN** a PRE ONLY or POST ONLY entry is shown
- **THEN** the button SHALL render badge + concise path + value preview without overlapping text blocks
