## ADDED Requirements

### Requirement: Diff output SHALL suppress redundant child differences under missing ancestors
The system SHALL not emit child-level differences for any branch where a higher-level missing-node finding already exists.

#### Scenario: Domain-level suppression
- **WHEN** a missing Domain Category is detected
- **THEN** no Service Category, section, or item-level differences under that Domain Category are emitted

#### Scenario: Service-level suppression
- **WHEN** a missing Service Category is detected
- **THEN** no section-level or item-level differences under that Service Category are emitted

### Requirement: Output SHALL preserve actionable hierarchy-level findings
The system MUST produce concise, non-redundant findings that identify the highest meaningful missing level first.

#### Scenario: Parent exists in both inputs
- **WHEN** parent nodes exist on both sides
- **THEN** comparator emits only relevant child-level differences for changed metadata/skills and does not suppress valid children unnecessarily
