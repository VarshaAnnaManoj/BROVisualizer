## Why

Users comparing ontology outputs in Pre and Post views need an immediate, visual way to understand structural and value differences without manually scanning two large JSON documents. A dedicated comparison view with color-coded change semantics will reduce analysis time and lower the risk of missing important deltas.

## What Changes

- Add a JSON comparison capability that derives a third comparison result from Pre and Post ontology JSON payloads.
- Highlight keys and values that exist in Pre but not Post using yellow styling.
- Highlight keys and values that exist in Post but not Pre using green styling.
- Represent changed values at the same path as paired removals/additions so users can see before/after differences clearly.
- Present comparison output in a readable grouped format suitable for large nested JSON documents.
- Keep comparison behavior independent from backend schema changes by using existing frontend data retrieval patterns for Pre and Post data.

## Capabilities

### New Capabilities
- `pre-post-json-diff-visualization`: Compute and render a visual diff between Pre and Post ontology JSON with color-coded additions/removals and clear change grouping.

### Modified Capabilities
- None.

## Impact

- Affected frontend code in the comparison UI state, data transformation, and rendering layers.
- New frontend tests for diff computation and color-mapped rendering behavior.
- No backend API contract changes required.
- Potential CSS updates for diff legend, highlighted rows, and responsive readability.
