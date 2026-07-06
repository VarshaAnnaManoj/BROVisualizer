## Why

In comparison mode, the Pre and Post source panes leave large unused vertical space and show duplicate “Back to Modified Ontology” buttons that do not provide unique value. This creates visual clutter and reduces readability when users need to inspect longer JSON content.

## What Changes

- Expand Pre and Post source pane content areas so they extend downward and better utilize available vertical space.
- Remove duplicated source-pane back buttons that appear in both panes when a diff target is active.
- Keep focus/highlight context visible without relying on those two buttons.
- Preserve existing diff navigation behavior from Modified to source panes.

## Capabilities

### New Capabilities
- `source-pane-vertical-fill`: Pre/Post source panes use available vertical area efficiently so JSON viewers extend downward in comparison mode.
- `source-pane-minimal-target-controls`: Active source context remains clear while removing redundant per-pane back buttons.

### Modified Capabilities
- None.

## Impact

- Affects comparison UI rendering and control markup in frontend/src/App.tsx.
- Affects source-pane sizing, layout, and active-target banner styling in frontend/src/App.css.
- Affects comparison interaction/regression tests in frontend/src/App.test.tsx.
- No backend or API changes.
