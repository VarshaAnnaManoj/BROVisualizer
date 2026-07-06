## 1. Layout Structure Changes

- [x] 1.1 Remove the Modified Ontology panel block from the comparison grid in frontend dashboard rendering.
- [x] 1.2 Ensure Pre and Post pane components remain rendered with existing controls and bubble strips.
- [x] 1.3 Remove or update any helper text/content that only belonged to the shaded modified area.

## 2. Metadata Space Reallocation

- [x] 2.1 Update grid templates so reclaimed comparison-row space is reassigned to the metadata area.
- [x] 2.2 Increase metadata card area/dimensions to use the additional space while preserving readability.
- [x] 2.3 Keep Image and OCR Text sections present in the right-side panel with stable placement.

## 3. Responsive and Visual Stability

- [x] 3.1 Update responsive breakpoints to maintain usable layout after removing the modified panel.
- [x] 3.2 Verify desktop/tablet/mobile behavior prevents overlap, clipping, or hidden controls.
- [x] 3.3 Preserve typography, spacing, and scroll behavior for long metadata content.

## 4. Validation and Regression Safety

- [x] 4.1 Update frontend tests to assert the Modified Ontology shaded panel is not rendered.
- [x] 4.2 Add or update tests to verify metadata panel uses expanded area and media sections remain visible.
- [x] 4.3 Run frontend test suite and perform manual UI verification against the requested design outcome.
