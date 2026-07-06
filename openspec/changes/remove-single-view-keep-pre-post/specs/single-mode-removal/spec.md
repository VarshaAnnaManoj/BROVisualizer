## ADDED Requirements

### Requirement: Single-view rendering path SHALL be removed
The system SHALL remove Single-view-specific rendering and state branching so that only comparison rendering logic is executed.

#### Scenario: Rendering branch validation
- **WHEN** the app renders ontology content
- **THEN** only comparison pane rendering is used and Single-view branch output is absent

### Requirement: Single-view fetch path SHALL be removed
The system MUST remove Single-mode-only fetch/update flow that depends on single-view state.

#### Scenario: Data refresh behavior
- **WHEN** the user refreshes or loads ontology data
- **THEN** the app uses Pre/Post pane data flow only and no Single-mode-specific fetch loop runs

### Requirement: Tests SHALL guard against Single-mode reintroduction
The system SHALL include regression tests asserting absence of Single controls and presence of default compare workflow.

#### Scenario: Regression safety
- **WHEN** frontend tests are executed
- **THEN** tests fail if Single mode button or Single-only view is reintroduced
