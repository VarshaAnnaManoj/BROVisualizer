## ADDED Requirements

### Requirement: Modified Navigation SHALL Highlight the Exact Target Entry
The system SHALL resolve each selected Modified-entry path to the exact corresponding entry in the selected Pre or Post JSON viewer whenever that entry exists.

#### Scenario: Indexed array path highlights only indexed item
- **WHEN** a user selects a Modified entry with a path containing an array index
- **THEN** the source viewer SHALL highlight only the indexed item represented by that path

#### Scenario: Nested object path highlights exact nested field
- **WHEN** a user selects a Modified entry with a nested object path
- **THEN** the source viewer SHALL highlight the exact nested field or block represented by the full path

### Requirement: Path Resolution SHALL Remain Deterministic with Repeated Keys
The system SHALL use full path context so repeated key names in different branches do not produce incorrect highlight targets.

#### Scenario: Repeated key name across branches
- **WHEN** the same key name appears in multiple branches and a Modified entry is selected
- **THEN** the highlight SHALL appear in the branch indicated by the full selected path

### Requirement: Missing Exact Target SHALL Use Controlled Fallback
If an exact target cannot be resolved, the system SHALL use a nearest valid fallback target without highlighting unrelated sections.

#### Scenario: Exact item missing in source payload
- **WHEN** the selected path points to an entry that does not exist in the source viewer payload
- **THEN** the system SHALL highlight the nearest valid path scope and keep navigation context visible

#### Scenario: Fallback does not jump to unrelated branch
- **WHEN** fallback behavior is triggered
- **THEN** the highlight SHALL remain within the selected path lineage and SHALL NOT target a different top-level branch
