## ADDED Requirements

### Requirement: Compact metadata layout SHALL adapt across breakpoints
The system SHALL preserve compact layout intent on desktop and apply responsive reflow on tablet/mobile without reintroducing excessive empty space.

#### Scenario: Tablet viewport
- **WHEN** viewport is tablet-sized
- **THEN** metadata cards reflow appropriately while maintaining compact spacing and readable text

### Requirement: Compare layout balance SHALL be maintained after metadata compaction
The system MUST keep Pre/Post/Modified panels usable and visually balanced after metadata width reduction.

#### Scenario: Full compare page render
- **WHEN** metadata panel width is reduced
- **THEN** compare panes remain visible, functional, and not visually compressed beyond usability
