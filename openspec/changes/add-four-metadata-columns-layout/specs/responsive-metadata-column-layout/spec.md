## ADDED Requirements

### Requirement: Metadata layout SHALL adapt responsively across viewport sizes
The system SHALL use responsive breakpoints so the metadata panel changes from four columns to fewer columns on smaller screens while preserving readability.

#### Scenario: Narrow viewport
- **WHEN** viewport width is below desktop breakpoint
- **THEN** metadata columns reflow to 2-column or 1-column layout without horizontal clipping

### Requirement: Readability SHALL be preserved for long metadata text
The system MUST wrap long metadata text and avoid overlap or truncation that hides critical content.

#### Scenario: Long validation notes
- **WHEN** validation_notes or change_reason contains long text
- **THEN** content wraps and remains readable within the metadata layout bounds
