## ADDED Requirements

### Requirement: Metadata Columns panel uses absolute positioning in desktop layout
The frontend SHALL render the Metadata Columns container with position absolute in desktop viewport ranges using explicit anchor coordinates within a positioned parent container.

#### Scenario: Absolute placement is active on desktop
- **WHEN** the dashboard is rendered at desktop width
- **THEN** the Metadata Columns panel MUST use absolute positioning with deterministic top and right anchoring

### Requirement: Absolute positioning is scoped to a containing block
The frontend SHALL define a positioned parent container so absolute Metadata Columns coordinates are computed relative to that container rather than the page viewport.

#### Scenario: Scoped anchor context
- **WHEN** the Metadata Columns panel is laid out
- **THEN** its position MUST be anchored to a parent containing block with position relative or equivalent

### Requirement: Responsive fallback disables absolute mode on smaller screens
The frontend SHALL provide responsive behavior that switches Metadata Columns to normal flow positioning for narrow viewport widths.

#### Scenario: Mobile and tablet fallback
- **WHEN** viewport width is below the configured breakpoint
- **THEN** Metadata Columns MUST render in non-absolute flow mode to avoid overlap and clipping

### Requirement: Existing metadata content behavior remains unchanged
The frontend SHALL preserve current metadata field rendering, labels, and fallback values while changing only positioning mechanics.

#### Scenario: Content parity after positioning change
- **WHEN** metadata values are loaded or missing
- **THEN** rendered fields and fallback text MUST match prior behavior

### Requirement: Metadata and Pre/Post viewers use independent height contexts
The frontend SHALL ensure Metadata Columns and Pre/Post viewer panes do not enforce each other's vertical size in desktop absolute mode.

#### Scenario: Long metadata does not extend source viewer height
- **WHEN** metadata content becomes long enough to overflow
- **THEN** metadata MUST use contained overflow without increasing Pre/Post pane height

#### Scenario: Long source JSON does not extend metadata panel height
- **WHEN** Pre or Post JSON content becomes long enough to overflow
- **THEN** source viewers MUST use contained overflow without increasing Metadata Columns panel height

### Requirement: Existing Pre and Post interactions are unaffected
The frontend SHALL NOT regress Pre/Post loading, JSON mode toggles, bubble navigation, or focus highlighting.

#### Scenario: Comparison interactions continue working
- **WHEN** users perform existing comparison actions
- **THEN** all prior interaction behaviors MUST remain functional
