## ADDED Requirements

### Requirement: Two-pane comparison layout
The system SHALL provide a comparison mode that displays two ontology viewer panes labeled `Pre` and `Post` simultaneously.

#### Scenario: Comparison mode renders both panes
- **WHEN** the user opens the ontology comparison view
- **THEN** the UI shows two visible panes labeled `Pre` and `Post`
- **THEN** each pane includes an ontology JSON viewer area

### Requirement: Independent pair inputs per pane
The system SHALL require an `id` and `version` input pair for each pane and SHALL keep pane inputs independent.

#### Scenario: Pane inputs are independent
- **WHEN** the user edits `Pre` inputs
- **THEN** `Post` inputs remain unchanged
- **THEN** no `Post` fetch is triggered by `Pre` input edits alone

#### Scenario: Pair validation blocks invalid submission
- **WHEN** the user submits a pane with missing or invalid `id` or `version`
- **THEN** the system shows a validation message for that pane
- **THEN** the system does not send a retrieval request for that pane

### Requirement: Pair-based ontology retrieval
The system SHALL retrieve ontology JSON for each pane using that pane's `(id, version)` pair.

#### Scenario: Pre and Post retrieval uses distinct pairs
- **WHEN** the user submits valid pairs for both `Pre` and `Post`
- **THEN** the system sends retrieval requests for both pairs
- **THEN** each pane renders the JSON corresponding to its own pair

### Requirement: Pane-local error handling
The system SHALL isolate loading and error handling per pane so one pane can fail without blocking the other.

#### Scenario: One pane fails while other succeeds
- **WHEN** `Pre` resolves successfully and `Post` resolves as not found
- **THEN** `Pre` displays ontology JSON
- **THEN** `Post` displays a not-found message in the `Post` pane
- **THEN** the page remains interactive and allows retrying only `Post`

### Requirement: Existing single-view behavior remains available
The system SHALL preserve existing non-comparison ontology viewer behavior unless the user explicitly enters comparison mode.

#### Scenario: Legacy flow still works
- **WHEN** the user uses existing single-view controls
- **THEN** ontology data loads and renders as before
- **THEN** comparison-only UI elements are not required for the legacy flow
