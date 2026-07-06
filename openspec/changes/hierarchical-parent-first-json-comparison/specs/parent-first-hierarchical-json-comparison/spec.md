## ADDED Requirements

### Requirement: Comparator SHALL evaluate ontology JSON top-down by hierarchy
The system SHALL compare ontology JSON in hierarchical order: Domain Category, Service Category, section arrays, then item-level content.

#### Scenario: Parent-first traversal order
- **WHEN** the comparator processes two ontology JSON documents
- **THEN** it evaluates parent existence at each level before evaluating child nodes

### Requirement: Missing parent SHALL stop child traversal for that branch
If a parent node exists in one JSON and is missing in the other, the system MUST report the missing parent node and MUST NOT descend into that node's children.

#### Scenario: Missing Domain Category
- **WHEN** a Domain Category exists in JSON A but not in JSON B
- **THEN** the comparator reports missing entire Domain Category and does not compare any descendant Service Category, metadata, or skills under it

#### Scenario: Missing Service Category
- **WHEN** a Service Category exists in JSON A but not in JSON B
- **THEN** the comparator reports missing entire Service Category and does not compare metadata or skill arrays for that service
