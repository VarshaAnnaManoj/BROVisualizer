## Context

The current right-side area of the dashboard is optimized for metadata cards and does not render a production-ready media + OCR content experience from backend fields. The requested redesign introduces a stronger right pane that includes an Image preview and OCR Text panel while preserving existing Pre/Post JSON comparison behavior.

Current constraints:
- Backend response currently sets image_url to null and does not expose ocr_text.
- Frontend right panel has metadata grid but no dedicated OCR text section and no location-based image binding.
- Existing comparison interactions (bubble actions, focused path highlighting, and pane loading) must remain stable.

## Goals / Non-Goals

**Goals:**
- Expose location and ocr_text in ontology API responses without breaking existing fields.
- Render a redesigned right pane that includes an Image block and OCR Text block sourced from API payload.
- Keep metadata cards visible and readable in the redesigned right pane.
- Provide graceful fallback UI when location or ocr_text is missing or empty.

**Non-Goals:**
- Rewriting diff generation logic or changing Pre/Post comparison semantics.
- Introducing new API endpoints if current ontology endpoint can carry required fields.
- Changing ontology JSON payload structure for input_json and output_json.

## Decisions

1. Extend existing ontology response model
- Decision: Add explicit response fields for location and ocr_text in the same ontology record response used by the frontend.
- Rationale: Keeps integration simple and avoids extra client round-trips.
- Alternative considered: Add separate endpoint for OCR/media. Rejected because it increases latency and client complexity.

2. Backend mapping strategy
- Decision: Map image_url from location at service layer while also exposing location and ocr_text directly for UI consumption.
- Rationale: Preserves backward compatibility for any existing image_url usage while satisfying new design requirements.
- Alternative considered: Replace image_url entirely with location. Rejected to reduce break risk.

3. Right-pane layout strategy
- Decision: Implement right pane as a responsive grid with top content row (Image + OCR Text) and lower metadata card row.
- Rationale: Matches requested visual hierarchy and remains robust on narrower widths.
- Alternative considered: Single-column stacked cards only. Rejected because it does not match requested desktop design density.

4. Fallback behavior
- Decision: Use explicit placeholders ("Image unavailable", "OCR text not available") when data is missing.
- Rationale: Prevents blank or broken panels and improves operator clarity.
- Alternative considered: Hide missing sections. Rejected because it causes layout jumps and ambiguity.

## Risks / Trade-offs

- [location value may contain non-renderable or private paths] -> Mitigation: validate/normalize URLs on backend and sanitize display text in frontend.
- [Large ocr_text payload impacts rendering performance] -> Mitigation: constrain panel height, enable scroll, and preserve plain-text rendering.
- [Schema mismatch across DB environments] -> Mitigation: add backend tests for response mapping and fallback defaults.
- [Layout regressions on smaller screens] -> Mitigation: add responsive breakpoints and visual checks for tablet/mobile widths.

## Migration Plan

1. Add location and ocr_text fields to backend model/schema/response mapping.
2. Update frontend right-pane state typing and rendering to consume new fields.
3. Implement redesigned right-pane layout and styles.
4. Add tests for API field exposure and UI fallback rendering.
5. Validate against development data and roll back by reverting API field mapping/layout commit if regressions occur.

## Open Questions

- Should location be returned as-is, or transformed into a signed/public URL before frontend rendering?
- Is OCR text expected to preserve original line breaks exactly, or can it be normalized for readability?
