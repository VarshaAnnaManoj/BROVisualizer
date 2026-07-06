## Context

The current comparison row contains three panels (Pre, Post, Modified Ontology). The middle/right shaded Modified Ontology panel is intentionally minimal and mainly repeats that bubble actions are available elsewhere. The requested UI direction is to remove this shaded area and use that reclaimed space for Metadata Columns so more metadata is visible without reducing readability.

Constraints:
- Pre and Post panes must retain existing functionality (load controls, toggles, highlighted navigation behavior).
- Image and OCR Text sections remain in the right-side information area.
- Backend APIs are already sufficient; this change is frontend layout and rendering only.

## Goals / Non-Goals

**Goals:**
- Remove the shaded Modified Ontology panel from the main comparison row.
- Reallocate that area to metadata-focused content so metadata columns become larger and easier to scan.
- Preserve all existing comparison interactions in Pre/Post panes.
- Maintain responsive behavior across desktop, tablet, and mobile.

**Non-Goals:**
- Changing diff algorithms or bubble action generation logic.
- Introducing new backend fields or API endpoints.
- Rewriting unrelated dashboard components outside the analysis area.

## Decisions

1. Remove panel, keep functionality in source panes
- Decision: Eliminate the Modified Ontology panel entirely from DOM layout and keep bubble actions only in Pre/Post panes.
- Rationale: This panel provides low-value placeholder content and consumes prime viewport area.
- Alternative considered: Keep panel but shrink height. Rejected because it still wastes horizontal space.

2. Metadata-first right side composition
- Decision: Expand the right-side panel width usage and increase metadata card area while retaining top media row (Image, OCR Text).
- Rationale: Matches requested visual priority and improves metadata readability.
- Alternative considered: Keep fixed compact metadata card dimensions. Rejected due to poor density.

3. Responsive reflow
- Decision: Use CSS grid breakpoints so desktop uses wider metadata distribution while smaller viewports stack logically.
- Rationale: Avoids overflow and preserves usability at all screen sizes.
- Alternative considered: Single rigid desktop grid. Rejected due to mobile/tablet break risk.

4. Regression coverage approach
- Decision: Update frontend tests to assert Modified Ontology panel absence and metadata area presence/expansion signals.
- Rationale: Prevents accidental reintroduction of the shaded area.
- Alternative considered: Manual verification only. Rejected for maintainability.

## Risks / Trade-offs

- [Users accustomed to Modified Ontology panel may miss it] -> Mitigation: keep bubble controls visible in Pre/Post and maintain focused path banners.
- [Large metadata text can still crowd cards] -> Mitigation: preserve wrapping and scroll behavior where needed.
- [Layout regressions at intermediate breakpoints] -> Mitigation: add targeted CSS media checks and UI test assertions.

## Migration Plan

1. Remove Modified Ontology panel JSX and related static helper text.
2. Update analysis/comparison/metadata CSS grid definitions to consume reclaimed width.
3. Verify right-side Image/OCR and metadata cards render correctly with loaded and fallback data.
4. Update frontend tests for absence of removed panel and continued comparison behavior.
5. Rollback plan: restore previous panel block and grid template if visual regressions are discovered.

## Open Questions

- Should any summary metrics from the removed panel be moved into metadata cards in a future iteration?
- Do we want configurable metadata card ordering once larger space is available?
