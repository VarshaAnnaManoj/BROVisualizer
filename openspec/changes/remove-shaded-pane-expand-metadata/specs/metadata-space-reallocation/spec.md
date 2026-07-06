## ADDED Requirements

### Requirement: Shaded modified panel is removed from comparison layout
The frontend SHALL remove the shaded Modified Ontology area from the comparison row and SHALL NOT render its placeholder content.

#### Scenario: Modified panel is absent
- **WHEN** the dashboard renders in comparison mode
- **THEN** there MUST be no visible Modified Ontology panel in the comparison grid

#### Scenario: Placeholder text is removed
- **WHEN** the dashboard loads analysis content
- **THEN** text indicating bubble actions in a standalone shaded modified panel MUST NOT be displayed

### Requirement: Reclaimed space is allocated to metadata content
The frontend SHALL use the reclaimed layout area to increase metadata-focused display capacity.

#### Scenario: Metadata area uses expanded space
- **WHEN** the comparison layout is rendered on desktop width
- **THEN** metadata columns MUST occupy additional horizontal and/or vertical space compared to previous compact layout

#### Scenario: Image and OCR panels remain visible
- **WHEN** metadata area is expanded
- **THEN** Image and OCR Text sections MUST remain present and readable in the right-side panel

### Requirement: Existing Pre/Post comparison behavior remains stable
Removing the shaded modified panel SHALL NOT alter Pre/Post loading, JSON toggles, bubble navigation, or focused-path highlighting.

#### Scenario: Pre/Post controls still operate
- **WHEN** users load ontology IDs and versions for Pre and Post panes
- **THEN** both panes MUST continue to load JSON and metadata data as before

#### Scenario: Bubble navigation still functions
- **WHEN** users click bubble actions in Pre or Post panes
- **THEN** focused path navigation and highlight behavior MUST remain intact

### Requirement: Layout remains responsive after reallocation
The redesigned layout SHALL remain usable across desktop, tablet, and mobile widths.

#### Scenario: Desktop metadata distribution
- **WHEN** viewport width is desktop-scale
- **THEN** metadata cards MUST render in multi-column form without clipping critical content

#### Scenario: Small-screen stacking
- **WHEN** viewport width is tablet/mobile-scale
- **THEN** metadata and media sections MUST stack or reflow without overlap or hidden controls
