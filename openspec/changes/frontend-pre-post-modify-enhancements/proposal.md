## Why

The frontend comparison workflow needs clearer and more controllable behavior across Pre, Post, and Modified sections so users can edit and evaluate all three consistently. This is needed now to reduce comparison mistakes and improve confidence during ontology validation.

## What Changes

- Standardize the interaction model for Pre, Post, and Modified sections so each supports the same edit, load, retry, and validation behavior.
- Improve section-level UX feedback to make it obvious which section is loading, valid, invalid, or failed.
- Refine layout and responsiveness for three-section comparison so all sections remain readable and usable on desktop and mobile.
- Ensure section operations stay isolated so updates in one section never overwrite or reset the others.

## Capabilities

### New Capabilities
- `frontend-pre-post-modify-workflow`: Provide a unified and isolated comparison workflow for Pre, Post, and Modified sections in the frontend.

### Modified Capabilities
- None.

## Impact

- Frontend UI/state logic in frontend/src/App.tsx.
- Frontend comparison layout and feedback styling in frontend/src/App.css.
- Frontend comparison behavior tests in frontend/src/App.test.tsx.
- No backend API contract changes expected.