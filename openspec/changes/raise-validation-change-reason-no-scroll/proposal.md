## Why

The current right-side metadata composition still pushes lower cards downward when content grows, which causes avoidable scrolling and weakens scanability of critical fields. Raising and tightening the layout for Validation Notes and Change Reason keeps key context visible within the viewport.

## What Changes

- Adjust right-side metadata layout so Validation Notes and Change Reason appear slightly higher and remain visible without unnecessary downward scrolling.
- Rebalance vertical spacing and card height distribution in the lower metadata half to reduce white-space and overflow pressure.
- Preserve existing equal-halves structure (top: Image/OCR, bottom: 4 metadata cards) while improving placement efficiency for lower cards.
- Maintain existing Pre/Post pane behavior, JSON navigation, and data rendering.

## Capabilities

### New Capabilities
- raised-lower-metadata-visibility: Improve lower metadata card placement so Validation Notes and Change Reason are positioned higher and less likely to trigger scroll-down behavior.

### Modified Capabilities
- None.

## Impact

- Frontend layout structure and CSS for right metadata panel card positioning and spacing.
- Frontend tests for metadata layout presence and no-unnecessary-scroll behavior.
- No backend or API contract changes.
