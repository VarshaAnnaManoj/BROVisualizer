## ADDED Requirements

### Requirement: JSON Input and Validation
The system SHALL allow users to paste or type JSON input and SHALL validate the input before rendering it in the viewer.

#### Scenario: Valid JSON input
- **WHEN** a user enters syntactically valid JSON and applies parse/format action
- **THEN** the system parses the JSON and renders it in viewer mode

#### Scenario: Invalid JSON input
- **WHEN** a user enters invalid JSON and attempts parse/format
- **THEN** the system shows a parse error message with actionable feedback
- **AND** does not replace the previously valid rendered view

### Requirement: JSON Formatting Controls
The system SHALL provide controls to pretty-format and minify JSON content.

#### Scenario: Pretty format action
- **WHEN** a user selects pretty format
- **THEN** the system rewrites JSON with consistent indentation and line breaks

#### Scenario: Minify action
- **WHEN** a user selects minify
- **THEN** the system rewrites JSON into compact minified representation

### Requirement: Interactive Tree Navigation
The system SHALL render parsed JSON as a collapsible tree with node-level and global expand/collapse controls.

#### Scenario: Node toggle
- **WHEN** a user toggles a tree node representing object/array
- **THEN** the system expands or collapses that node without re-parsing input

#### Scenario: Expand/collapse all
- **WHEN** a user selects global expand-all or collapse-all
- **THEN** the system updates visible tree state for all nodes

### Requirement: JSON Search and Path Visibility
The system SHALL support searching keys/values and showing stable JSON path context for matches.

#### Scenario: Search match highlighting
- **WHEN** a user enters a search term
- **THEN** the system highlights matching keys and scalar values in the tree

#### Scenario: Path context display
- **WHEN** a user selects or navigates to a node
- **THEN** the system displays the corresponding JSON path for that node
