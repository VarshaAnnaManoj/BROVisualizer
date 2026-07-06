## Context

The dashboard right-side panel currently shows media and metadata but leaves notable blank space and uneven vertical distribution. The requested behavior is a constrained screen-fit composition: top half for Image/OCR and bottom half split into four equal metadata parts, with text wrapping inside available card space rather than introducing page-level scroll.

Existing constraints:
- Pre/Post JSON panes must continue to operate unchanged.
- Media and metadata content can be long and variable.
- The layout should remain responsive for desktop/tablet/mobile.

## Goals / Non-Goals

**Goals:**
- Enforce two equal horizontal halves in the right-side panel.
- Upper half: two equal columns for Image and OCR Text.
- Lower half: four equal metadata cards.
- Prefer wrap/contained overflow behavior so panel content remains within screen area and avoids page-level vertical scroll expansion.
- Preserve all existing comparison interactions and data mappings.

**Non-Goals:**
- Changing backend data contracts.
- Modifying diff-generation logic.
- Reworking unrelated global dashboard sections.

## Decisions

1. Equal-halves panel contract
- Decision: Make the right-side panel a fixed two-row grid with `1fr 1fr` rows (top media row, bottom metadata row).
- Rationale: Guarantees equal visual distribution and removes ad-hoc spacing.
- Alternative considered: Content-driven auto rows. Rejected because it reintroduces inconsistent whitespace.

2. Top-half media layout
- Decision: Use a two-column grid in the upper half with equal column widths for Image and OCR.
- Rationale: Ensures balanced presentation and direct side-by-side comparison.
- Alternative considered: Stacked media cards. Rejected for desktop density goals.

3. Bottom-half metadata layout
- Decision: Render metadata in a 2x2 equal-card grid (four equal parts) in the lower half.
- Rationale: Matches requested equal partitioning while preserving readability.
- Alternative considered: Uneven masonry card heights. Rejected for predictability.

4. Screen-fit wrapping strategy
- Decision: Use text wrapping, constrained card heights, and internal scroll only where unavoidable (e.g., OCR block), while preventing growth that causes page-level vertical expansion.
- Rationale: Maintains in-viewport usability and avoids long-page scrolling.
- Alternative considered: Unlimited card growth. Rejected due to whitespace and scroll issues.

## Risks / Trade-offs

- [Very long metadata/OCR text may still require internal scroll] -> Mitigation: preserve readable line-height, clamp where needed, and enable contained overflow.
- [Strict equal heights may truncate perceived content] -> Mitigation: prioritize wrapping and internal scroll over hidden content.
- [Small-screen real estate is tight] -> Mitigation: responsive breakpoint to stack cards while preserving panel order.

## Migration Plan

1. Update right-pane JSX/CSS layout primitives to strict equal halves.
2. Configure top half (Image/OCR) and bottom half (4 metadata cards) equal-grid partitions.
3. Tune wrapping/overflow behavior to remain screen-contained.
4. Update frontend tests for panel structure and no-extra-scroll expectations.
5. Verify manually in browser on representative viewport sizes.

## Open Questions

- Should OCR text use a max-line clamp before internal scroll starts?
- Do we need user-resizable panel heights in future iterations?
