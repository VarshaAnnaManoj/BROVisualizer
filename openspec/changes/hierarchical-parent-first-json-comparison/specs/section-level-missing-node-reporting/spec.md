## ADDED Requirements

### Requirement: Missing section arrays SHALL be reported once at section level
If metadata, explicit_skills, or implicit_skills exists on one side and is absent on the other, the system SHALL report the whole section as missing and MUST NOT emit child-level missing entries for that section.

#### Scenario: Missing metadata section
- **WHEN** metadata array exists in JSON A and is absent in JSON B for the same Service Category
- **THEN** output contains one missing section event for metadata and no individual metadata object missing events

#### Scenario: Missing explicit_skills section
- **WHEN** explicit_skills array exists in JSON A and is absent in JSON B for the same Service Category
- **THEN** output contains one missing section event for explicit_skills and no individual skill missing events

#### Scenario: Missing implicit_skills section
- **WHEN** implicit_skills array exists in JSON A and is absent in JSON B for the same Service Category
- **THEN** output contains one missing section event for implicit_skills and no individual skill missing events

### Requirement: Child comparison SHALL occur only when corresponding sections exist in both JSONs
The system MUST compare metadata objects and skill items only after confirming the section exists in both inputs.

#### Scenario: Section present in both inputs
- **WHEN** metadata section exists in both JSON A and JSON B
- **THEN** comparator performs child-level comparison for metadata_name, values, and mutually_exclusive changes
