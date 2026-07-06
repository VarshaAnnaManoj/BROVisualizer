## ADDED Requirements

### Requirement: Grouped branch entries SHALL remain concise and non-duplicative
The system SHALL present grouped missing hierarchy actions without duplicate or redundant descendant entries.

#### Scenario: No duplicate buttons for one missing branch
- **WHEN** diff input includes multiple nested descendant differences under a missing branch
- **THEN** only one button/action is displayed for that branch

### Requirement: Existing granular behavior SHALL be preserved when parent exists
The system MUST continue generating child-level actions when parent branches exist in both pre and post JSON and only descendants differ.

#### Scenario: Parent exists and metadata value changes
- **WHEN** a service parent exists in both sides and only metadata values change
- **THEN** relevant child-level modified actions are still generated
