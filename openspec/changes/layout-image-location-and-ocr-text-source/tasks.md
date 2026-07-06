## 1. Backend Field Exposure

- [x] 1.1 Add location and ocr_text attributes to ontology model mapping for the source relation.
- [x] 1.2 Extend response schema types to expose location and ocr_text while preserving existing fields.
- [x] 1.3 Update ontology service mapping to populate image_url from location and pass through location and ocr_text.

## 2. Frontend Data Integration

- [x] 2.1 Extend frontend API record/state types to include location and ocr_text for each pane.
- [x] 2.2 Update data loading logic so right-pane content is sourced from location and ocr_text with fallback defaults.
- [x] 2.3 Ensure existing metadata extraction and Pre/Post diff behavior remains unchanged.

## 3. Right-Pane Redesign Implementation

- [x] 3.1 Refactor right-pane layout into top media row (Image + OCR Text) and metadata card row matching the provided design intent.
- [x] 3.2 Implement responsive CSS behavior for desktop/tablet/mobile without breaking existing panel sizing.
- [x] 3.3 Add explicit empty/error visual states for missing location and missing ocr_text values.

## 4. Validation and Regression Safety

- [x] 4.1 Add or update backend tests to verify location and ocr_text are returned correctly and image_url remains compatible.
- [x] 4.2 Add or update frontend tests to verify image/OCR rendering and fallback behavior.
- [x] 4.3 Execute backend and frontend test subsets and perform manual visual verification against the attached design.
