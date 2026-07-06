## ADDED Requirements

### Requirement: Pre/Post highlighting SHALL target only the relevant JSON node
The system SHALL highlight only the smallest relevant JSON node for the selected difference path in Pre/Post comparison and MUST NOT highlight unrelated parent blocks or entire pane-sized regions.

#### Scenario: Missing capability exists only in Post
- **WHEN** a capability entry (for example, "Improvement of indoor air quality") exists in Post but not in Pre and the corresponding difference is selected
- **THEN** the Post viewer highlights only that capability entry and the Pre viewer shows only path-level context without broad pane-wide highlight

#### Scenario: Missing category exists only in Pre
- **WHEN** a category exists in Pre but not in Post and the corresponding difference is selected
- **THEN** the Pre viewer highlights only the missing category node and the Post viewer does not apply unrelated broad highlighting

### Requirement: Highlight fallback SHALL remain narrow when exact token match is unavailable
If an exact tokenized path match cannot be resolved, the system MUST fallback to the nearest scoped node in the same lineage and MUST NOT escalate to top-level section highlighting.

#### Scenario: Repeated keys create ambiguous token resolution
- **WHEN** multiple sibling branches contain repeated key names and the selected path cannot be matched exactly to one leaf node
- **THEN** the system applies fallback highlight only to the nearest branch in the selected lineage and does not highlight unrelated branches
