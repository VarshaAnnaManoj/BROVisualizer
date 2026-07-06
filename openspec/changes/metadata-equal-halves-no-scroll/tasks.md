## 1. Right-Panel Equal-Halves Layout

- [x] 1.1 Refactor right-side metadata panel container to enforce two equal vertical halves.
- [x] 1.2 Implement upper-half two-column split with equal widths for Image and OCR Text.
- [x] 1.3 Implement lower-half four-part equal metadata card layout for Change Description, Hierarchy Assessment, Validation Notes, and Change Reason.

## 2. Screen-Fit Wrapping and Overflow Control

- [x] 2.1 Add CSS constraints so panel content wraps within available card boundaries.
- [x] 2.2 Ensure long OCR/metadata content uses contained overflow behavior without forcing page-level vertical expansion.
- [x] 2.3 Tune card spacing, line-height, and sizing to reduce visible white-space imbalance.

## 3. Responsive Behavior

- [x] 3.1 Define breakpoints that preserve equal-halves intent on desktop while reflowing safely on smaller screens.
- [x] 3.2 Verify mobile/tablet stacking order keeps Image/OCR above metadata cards and avoids overlap.
- [x] 3.3 Validate no controls or text are clipped after reflow.

## 4. Regression Validation

- [x] 4.1 Update frontend tests to assert equal-halves layout primitives and panel presence expectations.
- [x] 4.2 Add or update tests for long-content wrapping/contained overflow behavior in OCR and metadata cards.
- [x] 4.3 Run frontend tests and perform manual browser verification that layout fills screen area without unnecessary page scroll.
