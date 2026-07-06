## Why

Current comparison output misses some changes when nodes are unnamed or structurally ambiguous, and users must manually search both panes after clicking a diff entry. This slows review and can hide meaningful ontology differences.

## What Changes

- Expand comparison coverage to include changes under both named nodes (for example Category and Capability names) and unnamed nodes (for example array/object nodes without stable labels).
- Improve path mapping so modified entries can resolve highlight targets even when node names are absent or repeated.
- Add synchronized source navigation behavior: clicking a Modified entry scrolls both Pre and Post viewers to the relevant highlighted region.
- Preserve existing Pre-only/Post-only semantics and changed-value dual actions while improving target discovery.

## Capabilities

### New Capabilities
- `named-unnamed-node-change-coverage`: Detect and present modifications for named and unnamed ontology nodes consistently.
- `dual-pane-scroll-to-highlight`: On diff-entry navigation, scroll both source panes to their highlighted targets so users can compare in-place.

### Modified Capabilities
- None.

## Impact

- Frontend diff/path resolution and navigation logic in frontend/src/App.tsx.
- Source highlight and scroll behavior styling in frontend/src/App.css.
- Regression and behavior tests in frontend/src/App.test.tsx.
- No backend API or schema changes.
