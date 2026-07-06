## Why

When users click entries in Modified Ontology, they need clearer visual orientation in the source viewers to confirm exactly where they landed. The current behavior indicates navigation context, but the target section should receive stronger focus treatment and a distinct background highlight for faster scanning.

## What Changes

- Enhance Modified-to-source navigation so clicking a Modified entry focuses the corresponding section in the relevant Pre or Post JSON viewer.
- Add a persistent visual highlight/background treatment for the active source section to improve discoverability.
- Keep existing Modified navigation actions and roundtrip behavior intact while improving focus clarity.
- Ensure keyboard and screen-reader users receive equivalent focus and state cues.

## Capabilities

### New Capabilities
- `modified-source-focus-highlight`: Improve source-viewer focus targeting and active-section background highlighting when navigating from Modified Ontology.

### Modified Capabilities
- None.

## Impact

- Frontend comparison UI logic in `frontend/src/App.tsx`.
- Frontend comparison styling in `frontend/src/App.css`.
- Frontend behavior/accessibility tests in `frontend/src/App.test.tsx`.
- No backend or API contract changes.
