## ADDED Requirements

### Requirement: Derived Pre/Post diff pane
The system SHALL compute the third comparison pane from the currently loaded Pre and Post ontology JSON payloads instead of loading an independent ontology record for that pane.

#### Scenario: Diff pane is generated from Pre and Post
- **WHEN** comparison mode has valid loaded JSON for both Pre and Post sections
- **THEN** the third pane displays computed comparison results derived from those two payloads
- **THEN** no independent ontology fetch is required for third-pane content

### Requirement: Color semantics for presence differences
The system SHALL highlight JSON paths that exist only in Pre as yellow and JSON paths that exist only in Post as green.

#### Scenario: Key exists only in Pre
- **WHEN** a JSON path is present in Pre and absent in Post
- **THEN** the diff pane renders that path and value with yellow-highlighted removal semantics

#### Scenario: Key exists only in Post
- **WHEN** a JSON path is present in Post and absent in Pre
- **THEN** the diff pane renders that path and value with green-highlighted addition semantics

### Requirement: Changed value representation with paired entries
The system SHALL represent value changes at the same JSON path as a paired Pre removal and Post addition using yellow and green highlighting respectively.

#### Scenario: Scalar value differs at same path
- **WHEN** Pre and Post both contain the same JSON path with different scalar values
- **THEN** the diff pane shows the Pre value as yellow and the Post value as green
- **THEN** both entries reference the same JSON path for before/after clarity

### Requirement: Deterministic nested comparison behavior
The system SHALL compare nested objects and arrays deterministically and produce stable output ordering for the same inputs.

#### Scenario: Repeated comparison with unchanged inputs
- **WHEN** the same Pre and Post JSON payloads are compared multiple times
- **THEN** the diff pane groups and ordering remain consistent across runs

### Requirement: Responsive readability of diff output
The system SHALL keep diff grouping, highlighting, and row content readable on desktop and mobile breakpoints without horizontal clipping of critical controls.

#### Scenario: Comparison on mobile viewport
- **WHEN** the viewport is reduced to mobile width
- **THEN** diff sections remain legible with intact color and text labels
- **THEN** comparison controls remain operable and non-overlapping
