## Context

The metadata panel currently displays an image in a constrained area. Users reviewing ontology changes need a larger view to inspect details, but navigation away from the compare screen introduces friction. A local UI toggle behavior can solve this without changing API contracts.

## Goals / Non-Goals

**Goals:**
- Provide a predictable click-to-expand and click-to-contract image interaction.
- Keep implementation localized to frontend metadata/image components.
- Maintain compatibility with existing API response fields (`location`/`image_url`) and rendering fallbacks.
- Support keyboard users by offering a focusable element and ESC/click-close behavior.

**Non-Goals:**
- No backend schema or endpoint changes.
- No image editing, annotation, or zoom-level controls beyond expand/contract toggle.
- No redesign of the metadata panel beyond what is required for expansion UX.

## Decisions

- Use component-local state (boolean expanded flag) to control expanded image mode.
  - Rationale: simple, low-risk, and easy to test.
  - Alternative considered: global app state; rejected due to unnecessary complexity.
- Render expanded image in an overlay/modal layer with viewport-constrained sizing.
  - Rationale: avoids layout breakage in existing panel and provides consistent behavior across screen sizes.
  - Alternative considered: inline panel growth; rejected because it can push core comparison panes off-screen.
- Treat image click as primary toggle interaction and include explicit close affordance and keyboard handling.
  - Rationale: fulfills interaction requirement while remaining accessible.

## Risks / Trade-offs

- [Risk] Overlay layering conflicts with existing z-indexed controls -> Mitigation: define dedicated z-index token and test key screens.
- [Risk] Large images may overflow smaller devices -> Mitigation: apply max-width/max-height and object-fit containment.
- [Risk] Click handling might interfere with image loading fallback behavior -> Mitigation: keep error/fallback states separate from toggle state.

## Migration Plan

- Implement behind existing UI behavior without data contract changes.
- Validate with manual checks on desktop/mobile layouts.
- Rollback by removing toggle state and overlay rendering path if UX regressions appear.

## Open Questions

- Should expanded mode support scroll-to-zoom in future iterations?
- Should the OCR text panel auto-scroll to top when image expands?
