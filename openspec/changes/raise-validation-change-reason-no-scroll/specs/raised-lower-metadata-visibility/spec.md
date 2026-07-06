## ADDED Requirements

### Requirement: Validation Notes and Change Reason are positioned higher in the lower metadata half
The frontend SHALL tune lower metadata-half spacing and alignment so Validation Notes and Change Reason appear slightly higher and remain easier to access without scrolling down unnecessarily.

#### Scenario: Lower cards are visually raised
- **WHEN** the right metadata panel is rendered with standard payload content
- **THEN** Validation Notes and Change Reason MUST appear higher within the lower panel region than before this change

### Requirement: Equal-halves panel contract remains intact
The frontend SHALL preserve the existing equal-halves panel structure with top media/OCR and bottom metadata sections while applying the lower-card placement improvements.

#### Scenario: Top and bottom sections remain stable
- **WHEN** the panel is rendered
- **THEN** the layout MUST keep the top media/OCR half and lower metadata half as separate equal-height sections

### Requirement: Layout avoids unnecessary page-level scroll growth
The frontend SHALL prioritize contained wrapping and overflow for long metadata text so the page does not introduce avoidable vertical scrolling due to lower-card expansion.

#### Scenario: Long metadata remains contained
- **WHEN** Validation Notes or Change Reason contain long text
- **THEN** content MUST remain contained within card boundaries and avoid unnecessary page-level height expansion

### Requirement: Existing comparison interactions are unaffected
The frontend SHALL NOT regress existing Pre/Post controls, JSON mode toggles, bubble navigation, or focused-path highlighting.

#### Scenario: Comparison features continue to work
- **WHEN** users perform Pre/Post loading and navigation
- **THEN** all existing comparison interactions MUST behave the same as before this change
