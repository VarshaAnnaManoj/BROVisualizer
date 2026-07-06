## Why

The new metadata panel currently leaves a large unused shaded area and columns appear wider than necessary, reducing information density and visual balance. Optimizing whitespace and column sizing will make the compare screen more compact and easier to scan.

## What Changes

- Reduce excessive unused area in the right-side metadata section by tightening internal spacing and layout distribution.
- Decrease metadata column widths while preserving readability and wrapping for long content.
- Adjust panel and grid sizing so available shaded area is used effectively with less empty background space.
- Define responsive behavior so compact density persists on desktop and degrades gracefully on smaller screens.
- Add/adjust UI tests to verify dense layout structure and column rendering behavior.

## Capabilities

### New Capabilities
- `metadata-panel-whitespace-optimization`: Reduce unused space in metadata panel through tighter spacing and improved layout fill.
- `compact-metadata-column-sizing`: Apply narrower metadata column sizing without clipping important text.
- `dense-metadata-layout-responsiveness`: Maintain compact layout intent across desktop/tablet/mobile breakpoints.

### Modified Capabilities
- None.

## Impact

- Frontend CSS/layout rules for metadata panel and analysis grid.
- Frontend metadata column rendering dimensions and spacing behavior.
- UI test expectations related to metadata panel structure and readability.
- Visual consistency of compare screen with reduced blank/shaded area.
