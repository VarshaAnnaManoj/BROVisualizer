## ADDED Requirements

### Requirement: Default viewer mode SHALL be change-only
The system SHALL initialize Pre and Post pane mode to `Change Only`.

#### Scenario: Initial compare load
- **WHEN** compare view first loads
- **THEN** both Pre and Post panes are in `Change Only` mode

### Requirement: Default mode SHALL prioritize diff-relevant content
The system MUST present change-focused content in default mode instead of full payload output.

#### Scenario: Pane has mixed changed and unchanged content
- **WHEN** pane mode is `Change Only`
- **THEN** rendered output excludes unchanged-only content not relevant to current diff paths
