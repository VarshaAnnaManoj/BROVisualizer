## Why

Users need to inspect image details in the metadata panel without losing context of the pre/post comparison view. The current fixed-size image pane makes it hard to verify fine text or visual differences during review.

## What Changes

- Add click-to-toggle behavior on the metadata image so users can expand it to a larger overlay/modal view and click again to return to normal size.
- Preserve current page context while expanded, including active pre/post IDs, version values, and loaded API data.
- Ensure the expanded image remains usable on desktop and mobile (fit-to-viewport, scroll/contain behavior, and accessible close/toggle interaction).
- Keep OCR text visible and unchanged in the metadata panel while image toggle state changes.

## Capabilities

### New Capabilities
- `metadata-image-toggle-expand`: Allow users to toggle metadata image between default panel size and expanded view by clicking the image.

### Modified Capabilities
- None.

## Impact

- Frontend UI components in metadata/image rendering.
- Frontend styles for expanded image state and responsive behavior.
- Frontend interaction logic (click handlers, keyboard accessibility, and state management).
- Minimal or no backend/API changes expected.
