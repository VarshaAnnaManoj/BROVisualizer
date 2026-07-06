## ADDED Requirements

### Requirement: Diff Buttons SHALL Use Stacked Dense Content Blocks
The system SHALL use a stacked content structure that improves information density and avoids whitespace-heavy button appearance.

#### Scenario: Dense stacked layout for long path content
- **WHEN** a diff button has long path content
- **THEN** the button SHALL stack concise text blocks with controlled wrapping instead of leaving large blank regions

#### Scenario: Dense stacked layout for short path content
- **WHEN** a diff button has short path/value content
- **THEN** the button SHALL still maintain balanced spacing and not collapse into awkward gaps

### Requirement: Density Changes SHALL Preserve Navigation Semantics
Layout density changes SHALL not alter interaction/accessibility behavior.

#### Scenario: Full-path navigation name remains available
- **WHEN** concise stacked labels are shown in the button body
- **THEN** accessible names SHALL still include full path navigation context

#### Scenario: Pointer and keyboard activation remain unchanged
- **WHEN** users activate stacked diff buttons via click or keyboard
- **THEN** the same navigation and highlight actions SHALL execute successfully
