## Why

The current metadata column panel relies on normal document flow, which can shift vertically and contribute to inconsistent placement during resizing and long-content scenarios. Applying absolute positioning to the Metadata Columns container will stabilize its placement and improve predictable screen usage.

## What Changes

- Introduce absolute positioning behavior for the Metadata Columns panel within its parent layout context.
- Define explicit anchoring rules for top, right, bottom, and width so metadata placement remains stable across normal viewport sizes.
- Preserve existing metadata content rendering, card order, and field fallback behavior while changing positioning mechanics.
- Add responsive fallback behavior for smaller breakpoints where absolute positioning may reduce readability.

## Capabilities

### New Capabilities
- absolute-metadata-columns-layout: Position the Metadata Columns container using absolute coordinates with deterministic anchoring and responsive fallbacks.

### Modified Capabilities
- None.

## Impact

- Frontend layout and CSS for the right-side Metadata Columns panel.
- Frontend tests that validate panel presence and layout behavior under viewport changes.
- No backend API or data contract changes.
