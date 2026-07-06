## ADDED Requirements

### Requirement: Single mode control SHALL activate on first click
The system SHALL switch to Single view mode on the first valid click of the Single button and MUST NOT require a second click to complete activation.

#### Scenario: Transition from Pre/Post compare to Single
- **WHEN** the user is in compare mode and clicks the Single button once
- **THEN** the UI transitions to Single mode immediately and reflects Single as the active mode

#### Scenario: Rapid repeated clicks do not block first activation
- **WHEN** the user clicks the Single button and then clicks again quickly
- **THEN** the first click already activates Single mode and no intermediate broken state is shown

### Requirement: View mode transitions SHALL use deterministic state updates
The system MUST process view-mode button clicks through a single deterministic state transition path to prevent race-like double-click behavior.

#### Scenario: Mode state update order remains consistent
- **WHEN** the user clicks Single mode after any prior mode toggle sequence
- **THEN** state updates complete in a consistent order and Single mode is active after one click
