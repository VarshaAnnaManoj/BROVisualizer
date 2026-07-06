## Why

Pre and Post viewers currently emphasize full JSON rendering, which can make it harder to focus quickly on meaningful differences. A top-level toggle with a default of Change Only will improve signal-to-noise while still allowing users to switch to Full JSON when needed.

## What Changes

- Add a two-option toggle at the top of both Pre and Post JSON viewers: `Change Only` and `Complete JSON`.
- Set default viewer mode to `Change Only` on initial load.
- Ensure selecting `Complete JSON` renders the full JSON payload for the selected pane.
- Keep pane-level state behavior predictable when users switch IDs/versions or refresh data.
- Add frontend tests covering default mode, toggle switching, and rendered content behavior.

## Capabilities

### New Capabilities
- `pre-post-json-viewer-mode-toggle`: Provide a per-pane toggle that switches viewer rendering between Change Only and Complete JSON.
- `change-only-default-viewer-mode`: Initialize Pre and Post viewers in Change Only mode by default.
- `complete-json-on-demand-rendering`: Render full JSON only when the user explicitly selects Complete JSON.

### Modified Capabilities
- None.

## Impact

- Frontend compare-view UI controls and state management in Pre/Post pane components.
- JSON rendering logic to support two rendering modes per pane.
- Frontend test suite updates for mode defaults and mode transitions.
- Potential minor CSS updates for top-of-pane toggle controls.
