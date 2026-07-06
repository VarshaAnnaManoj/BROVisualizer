## ADDED Requirements

### Requirement: Metadata columns SHALL use reduced width compared to current layout
The system SHALL render metadata columns with narrower sizing to reduce unnecessary horizontal whitespace.

#### Scenario: Desktop compare view
- **WHEN** metadata panel is visible on desktop width
- **THEN** each metadata column uses compact width while still displaying full wrapped content

### Requirement: Narrow columns SHALL not hide metadata content
The system MUST preserve full metadata readability through line wrapping and non-clipping behavior.

#### Scenario: Long validation notes in narrow card
- **WHEN** a metadata value exceeds a single line
- **THEN** the text wraps within the card and remains visible without horizontal clipping
