## Why

Users cannot reliably trust the comparison workflow when clicking a Modified entry highlights the wrong JSON item in Pre or Post viewers. Correct item-level targeting is required so reviewers can verify exact differences without manual searching.

## What Changes

- Correct source-highlight targeting so each Modified entry maps to the exact JSON item represented by the selected path.
- Improve path resolution logic for nested objects, arrays, and indexed entries so highlight selection is deterministic.
- Add clear fallback behavior when a path cannot be resolved exactly, without silently highlighting unrelated content.
- Add regression tests for path-to-highlight mapping correctness across object, array, and mixed structures.

## Capabilities

### New Capabilities
- `exact-entry-highlight-targeting`: Ensure Modified-entry navigation highlights the exact target entry in the corresponding source JSON viewer.

### Modified Capabilities
- None.

## Impact

- Frontend comparison navigation and path-resolution logic in frontend/src/App.tsx.
- Source highlight and fallback visual states in frontend/src/App.css.
- Behavior and regression tests in frontend/src/App.test.tsx.
- No backend, API, or database changes.
