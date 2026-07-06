## ADDED Requirements

### Requirement: Descendant actions SHALL be suppressed under missing ancestors
If a missing parent branch action exists, the system SHALL NOT emit individual descendant actions beneath that ancestor.

#### Scenario: Suppress metadata and skills descendants
- **WHEN** a service parent branch is missing
- **THEN** no separate actions are generated for `metadata`, `explicit_skills`, `implicit_skills`, or their child items under that service path

### Requirement: Suppression SHALL be ancestor-scoped
The system MUST suppress only descendants of the missing ancestor and MUST NOT suppress unrelated branches.

#### Scenario: Unrelated service still emits actions
- **WHEN** one service branch is missing but another service branch has item-level changes
- **THEN** action generation remains intact for the unrelated changed branch
