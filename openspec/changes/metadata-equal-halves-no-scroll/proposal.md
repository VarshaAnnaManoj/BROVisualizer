## Why

The current right-side panel leaves excessive white space and does not distribute metadata in a balanced, screen-efficient way. A strict equal-halves layout improves scanability and keeps critical media and metadata visible without forcing page-level scrolling.

## What Changes

- Rework the right-side panel into two equal horizontal halves within the available screen area.
- Place Image and OCR Text in the upper half as two equal-width columns.
- Place Change Description, Hierarchy Assessment, Validation Notes, and Change Reason in the lower half as four equal parts.
- Ensure content wraps within panel boundaries and prefers internal wrapping/contained overflow rather than adding page-level vertical scroll.
- Preserve existing Pre/Post pane behavior and API-backed data rendering.

## Capabilities

### New Capabilities
- equal-halves-metadata-layout: Enforce equal top and bottom metadata-panel halves with media on top and four balanced metadata columns below, optimized to avoid page-level scrolling.

### Modified Capabilities
- None.

## Impact

- Frontend layout structure and CSS for right-side metadata/media panel.
- Frontend rendering and test assertions for panel sizing, wrapping, and no-extra-scroll behavior.
- No backend API changes required.
