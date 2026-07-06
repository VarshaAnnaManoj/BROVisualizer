## ADDED Requirements

### Requirement: Comparison SHALL Include Named and Unnamed Node Changes
The system SHALL detect and display changes for named nodes and unnamed nodes when deriving Modified Ontology entries.

#### Scenario: Named node capability field changes
- **WHEN** a named node field (for example category or capability branch value) differs between Pre and Post
- **THEN** the Modified pane SHALL include an entry representing that named-node change

#### Scenario: Unnamed array/object member changes
- **WHEN** an unnamed node (for example array element without explicit name key) differs between Pre and Post
- **THEN** the Modified pane SHALL include an entry with lineage-aware path context for that unnamed-node change

### Requirement: Path Mapping SHALL Resolve Repeated and Anonymous Structures Deterministically
The system SHALL map Modified entries to source highlights using full path lineage so repeated keys and anonymous members do not collide.

#### Scenario: Repeated key names in different branches
- **WHEN** identical key names exist in multiple branches
- **THEN** highlight resolution SHALL target the branch represented by the selected full path lineage

#### Scenario: Anonymous member with index lineage
- **WHEN** an unnamed member is addressed through index lineage
- **THEN** highlight resolution SHALL target the corresponding indexed member in each source pane when present

### Requirement: Missing Exact Match SHALL Stay in Same Lineage Scope
If one pane lacks an exact target, the fallback SHALL remain within the selected lineage scope.

#### Scenario: Exact member absent in one pane
- **WHEN** a selected path has no exact entry in one source pane
- **THEN** fallback highlight SHALL remain in nearest valid lineage scope and SHALL NOT jump to unrelated top-level branches
