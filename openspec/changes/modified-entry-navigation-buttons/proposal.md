## Why

Users can see derived differences in Modified Ontology, but they still need to manually search Pre and Post JSON panes to find the original context of a changed path. Clickable diff entries that jump to the source JSON improve traceability and speed up validation workflows.

## What Changes

- Render each Modified Ontology diff entry as an actionable button instead of static text rows.
- Show both `PRE ONLY` and `POST ONLY` entries together in one combined diff window while preserving clear source labels.
- Add click behavior so selecting an entry focuses the corresponding source pane (`Pre` or `Post`) and navigates to the exact path in that JSON viewer.
- Preserve changed-value representation so users can navigate from the old/new button entry to the respective pane.
- Add visual active-state feedback indicating which source pane/path is currently targeted.

## Capabilities

### New Capabilities
- `modified-entry-source-navigation`: Provide button-based diff entries in Modified Ontology and enable path-aware navigation to source Pre/Post JSON viewers.

### Modified Capabilities
- None.

## Impact

- Frontend comparison rendering and interaction logic in the main app view.
- Frontend styling for button-based diff entries, active states, and combined window readability.
- Frontend tests for entry click navigation, source routing, and pane focus behavior.
- No backend API or data contract changes.
