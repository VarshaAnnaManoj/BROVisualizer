## Why

When a full hierarchy branch (for example a full service object with metadata, explicit_skills, and implicit_skills) is missing on one side, the current UI can expose multiple granular actions instead of one concise action. Users need a single, high-signal navigation action per missing branch to reduce noise and quickly inspect the parent-level change.

## What Changes

- Add grouped missing-branch presentation logic so missing hierarchy branches are represented as one parent-level actionable diff entry.
- Prioritize parent-level change actions over child-level actions whenever the parent branch itself is missing.
- Ensure examples like missing `Duct & Furnace Cleaning` with nested metadata/skills render one button instead of per-child buttons.
- Keep existing child-level buttons only when parent nodes exist on both sides and granular item-level differences are valid.
- **BREAKING** Change modified-pane behavior for missing hierarchy branches by replacing multiple child actions with one grouped parent action.

## Capabilities

### New Capabilities
- `grouped-missing-hierarchy-actions`: Render one diff action/button per missing hierarchy parent branch instead of multiple actions for descendant nodes.
- `parent-action-priority-for-missing-branches`: Suppress descendant action generation when a parent branch missing condition exists.
- `hierarchy-branch-change-summarization`: Summarize nested missing content under a single parent-level modified entry while preserving clear path context.

### Modified Capabilities
- None.

## Impact

- Frontend modified-pane diff action generation and rendering logic in React comparison view.
- Backend/frontend diff contract usage where parent-level missing nodes drive UI grouping behavior.
- UI test suites for modified-pane navigation/action rendering and noise suppression.
- User interaction behavior: fewer buttons shown for missing hierarchy branches, with clearer parent-targeted navigation.
