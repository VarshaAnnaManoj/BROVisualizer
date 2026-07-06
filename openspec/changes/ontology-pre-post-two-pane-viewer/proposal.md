## Why

Users need to compare ontology outputs side-by-side for two selected record/version pairs, but the current flow only supports loading a single ontology context at a time. A dedicated Pre/Post comparison mode is needed now to make change analysis faster and reduce manual copy/paste validation.

## What Changes

- Add a two-pane ontology viewer mode with `Pre` and `Post` panels shown together.
- Add independent input controls for each pane: `id` and `version` pair for `Pre`, and `id` and `version` pair for `Post`.
- Fetch and render ontology JSON for each pane based on the provided pair inputs.
- Show clear pane-specific loading, validation, and error states without blocking the other pane.
- Keep existing single-record viewer behavior available unless explicitly switched to comparison mode.

## Capabilities

### New Capabilities
- `ontology-pre-post-two-pane-comparison`: Support side-by-side ontology JSON viewing driven by independent `(id, version)` inputs for Pre and Post contexts.

### Modified Capabilities
- None.

## Impact

- Frontend: [frontend/src/App.tsx](frontend/src/App.tsx) and related UI components/styles for comparison layout and dual-input state management.
- Backend/API: likely extends ontology fetch contract to support version-qualified retrieval (e.g., id + version query/filter), or confirms an existing endpoint supports it.
- UX: introduces comparison-specific validation and pane-level error messaging.
- Testing: requires frontend behavior tests and backend endpoint validation for pair-based retrieval paths.
