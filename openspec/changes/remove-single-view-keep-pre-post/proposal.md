## Why

The current UI exposes a Single JSON viewer mode that is no longer needed and creates extra interaction paths users do not want. A Pre/Post-only workflow simplifies operation and keeps users focused on comparison outcomes.

## What Changes

- **BREAKING** Remove Single mode from the UI mode selector and from runtime mode state handling.
- Make Pre/Post comparison the only available viewer mode and default landing experience.
- Remove Single-mode-specific fetch/render branches and keep data flow focused on Pre and Post panes.
- Update tests to verify the absence of Single mode and correct default rendering of Pre/Post panels.

## Capabilities

### New Capabilities
- `pre-post-only-view-mode`: Provide a comparison-only UI where Pre/Post is the sole available viewing mode.
- `single-mode-removal`: Remove Single-mode controls, rendering, and related behavior from the frontend workflow.

### Modified Capabilities
- None.

## Impact

- Frontend mode toggle and view-state logic in the main React app.
- Frontend rendering branch that currently shows Single ontology JSON viewer.
- Frontend tests that currently assume Single tab exists.
- No backend API, database, or infrastructure changes.
