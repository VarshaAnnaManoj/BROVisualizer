## ADDED Requirements

### Requirement: Pasted image placeholders SHALL not be shown in pane-visible JSON content
The system SHALL suppress placeholder values such as `Pasted Image` (including numbered variants) from rendered pane JSON content.

#### Scenario: Placeholder value in payload
- **WHEN** pane JSON includes `Pasted Image` or `Pasted Image#<n>` values
- **THEN** those placeholder entries are omitted from displayed pane content

### Requirement: Suppression SHALL not remove legitimate content
The system MUST preserve non-placeholder values while suppressing placeholder noise.

#### Scenario: Mixed placeholder and valid entries
- **WHEN** an array contains both placeholder and valid values
- **THEN** valid values remain visible and only placeholder entries are removed
