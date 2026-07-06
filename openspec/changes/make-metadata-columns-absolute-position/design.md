## Context

The Metadata Columns panel currently participates in regular flow layout, which can move unpredictably with content height and viewport resizing. The requested behavior is to make the Metadata Columns container use position absolute while retaining existing data rendering and interaction behavior.

## Goals / Non-Goals

**Goals:**
- Anchor the Metadata Columns panel with deterministic absolute coordinates in desktop layout.
- Preserve current metadata content, field semantics, and fallback text behavior.
- Avoid overlap or clipping by defining a clear containing block and dimensions.
- Provide responsive fallback for breakpoints where absolute positioning would reduce usability.

**Non-Goals:**
- No backend schema or endpoint changes.
- No changes to Pre and Post pane comparison logic.
- No redesign of metadata field content model.

## Decisions

1. Use a positioned parent as containing block
- Decision: apply position relative on the appropriate layout parent and position absolute on the Metadata Columns container.
- Rationale: absolute positioning must be scoped to an intentional containing block to avoid viewport-level drift.
- Alternative considered: position fixed. Rejected because it disconnects panel from page layout and scrolling context.

2. Option C height strategy (independent height contexts)
- Decision: keep absolute anchoring for Metadata Columns but decouple vertical sizing from Pre/Post viewers. Each side uses its own min/max height and internal overflow behavior.
- Rationale: avoids the current coupled-stretch effect where metadata and source panes extend downward together.
- Alternative considered: shared height contract. Rejected because it makes one side's content pressure visually drag the other side.

3. Responsive fallback mode
- Decision: switch back to non-absolute flow at small breakpoints through media queries.
- Rationale: absolute overlays can hurt readability and touch interaction on narrow screens.
- Alternative considered: keep absolute positioning at all sizes. Rejected for mobile usability risk.

## Risks / Trade-offs

- [Panel may overlap nearby content if container sizing changes] -> Mitigation: lock containing block dimensions and verify with regression checks.
- [Absolute layout may increase maintenance complexity] -> Mitigation: document anchor rules in styles and keep geometry centralized.
- [Long metadata text can still overflow cards] -> Mitigation: keep contained overflow behavior inside metadata cards.
- [Independent heights reduce visual symmetry between left and right panes] -> Mitigation: preserve alignment and spacing tokens while allowing separate overflow contexts.

## Migration Plan

1. Add or update CSS for relative parent and absolute Metadata Columns geometry.
2. Implement independent vertical sizing rules so metadata and source panes do not force each other's height.
3. Validate no overlap and stable placement in desktop viewport ranges.
4. Add responsive media-query fallback to normal flow for smaller screens.
5. Update frontend tests for panel presence, fallback behavior, and non-coupled height behavior.
6. Verify build and browser rendering.

## Open Questions

- Which exact desktop breakpoint should switch between absolute and flow modes?
- What max-height balance gives the best readability while keeping metadata and source panes independent?
