## ADDED Requirements

### Requirement: Diff Button Text SHALL Wrap Predictably
The system SHALL apply controlled wrapping so long button text wraps cleanly and avoids large blank gaps or fragmented letter-by-letter breaks.

#### Scenario: Long token wraps without excessive whitespace
- **WHEN** a diff button contains a long path/value token
- **THEN** text SHALL wrap according to defined overflow rules and SHALL NOT create excessive empty horizontal space

#### Scenario: Wrapped text remains readable across widths
- **WHEN** viewport width changes between desktop and mobile breakpoints
- **THEN** wrapped button text SHALL remain readable without clipping key badge/path/value content

### Requirement: Wrapping Changes SHALL Preserve Interaction Behavior
Text-wrap and spacing updates SHALL not break existing navigation interactions.

#### Scenario: Click and keyboard navigation still works after wrapping updates
- **WHEN** users activate a wrapped diff button by mouse or keyboard
- **THEN** the same navigation and highlight behavior SHALL execute successfully
