## Why

Bubble actions are currently isolated in Modified Ontology, which separates navigation controls from the Pre/Post panes they affect. Moving bubbles to their respective Pre/Post locations improves discoverability, shortens interaction distance, and makes source-target intent clearer.

## What Changes

- Relocate bubble navigation controls from Modified Ontology into their respective Pre and Post pane regions.
- Render Pre-target bubbles in the Pre pane area and Post-target bubbles in the Post pane area.
- Preserve existing bubble order, activation behavior, keyboard operability, and active/focus visual states.
- Update or remove Modified Ontology bubble strip usage so controls are no longer centralized there.
- Keep behavior consistent when diffs refresh or pane data reloads.

## Capabilities

### New Capabilities
- `pre-post-local-bubble-navigation`: Show bubble actions at respective Pre/Post locations while preserving existing navigation and highlighting behavior.

### Modified Capabilities
- None.

## Impact

- Frontend compare pane layout and bubble action rendering in App-level UI.
- Frontend CSS for bubble placement, spacing, and responsive behavior in each pane.
- Frontend tests for per-pane bubble placement and unchanged navigation semantics.
