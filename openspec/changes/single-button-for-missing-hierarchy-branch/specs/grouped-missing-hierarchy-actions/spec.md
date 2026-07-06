## ADDED Requirements

### Requirement: Missing hierarchy branches SHALL render as one actionable entry
When a hierarchy parent branch is missing on one side, the system SHALL create a single actionable modified entry for that parent branch.

#### Scenario: Missing service branch with nested metadata and skills
- **WHEN** a service branch such as `Duct & Furnace Cleaning` is missing and contains metadata, explicit_skills, and implicit_skills descendants
- **THEN** the modified view shows one action/button for the missing service branch path

### Requirement: Action path SHALL target the missing parent branch
The system MUST use the missing parent branch path as the canonical action target for grouped entries.

#### Scenario: Parent-targeted navigation
- **WHEN** a grouped missing branch action is selected
- **THEN** navigation/highlight targets the parent path and not individual descendant paths
