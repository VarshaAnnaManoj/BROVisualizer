## Why

The redesigned right-side panel requires real media and OCR content, but the current flow shows placeholder image behavior and does not expose OCR text from the data source. Aligning the API and UI to use the location and ocr_text columns is needed to match the requested design and make review workflows reliable.

## What Changes

- Add support for returning image URL/path from the backend using the location column for ontology records.
- Add support for returning OCR text from the backend using the ocr_text column.
- Update the frontend right panel to implement the attached redesign and render Image plus OCR Text sections with real values.
- Keep existing Pre/Post comparison functionality and metadata cards intact while restructuring the right-panel layout.
- Add or update tests covering API field exposure and frontend rendering fallbacks when location or ocr_text is missing.

## Capabilities

### New Capabilities
- right-pane-image-and-ocr-text: Render redesigned right pane with Image sourced from location and OCR Text sourced from ocr_text, backed by API fields.

### Modified Capabilities
- None.

## Impact

- Backend model/schema/service mapping for ontology records (new exposed fields).
- Frontend dashboard layout in the right-side panel and related styling.
- Backend and frontend tests for field mapping and UI fallback behavior.
- No intended breaking changes to existing Pre/Post comparison endpoints.
