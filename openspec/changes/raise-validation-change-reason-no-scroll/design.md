## Context

The frontend right-side panel already follows an equal-halves structure, but lower metadata cards can still appear too low as content expands, especially for Validation Notes and Change Reason. The user goal is to move these lower cards slightly upward and reduce scroll pressure while preserving the established Image/OCR top half and 4-card metadata bottom half.

## Goals / Non-Goals

**Goals:**
- Keep Validation Notes and Change Reason more visible by improving lower-half card vertical placement.
- Reduce avoidable vertical scrolling caused by uneven spacing or expansion.
- Preserve existing equal-halves contract and all comparison interactions.
- Keep responsive behavior stable on desktop/tablet/mobile.

**Non-Goals:**
- No backend payload or schema changes.
- No changes to diff-generation logic or bubble navigation behavior.
- No redesign of unrelated dashboard regions.

## Decisions

1. Lower-half upward bias through spacing rebalance
- Decision: tighten lower metadata grid paddings/gaps and adjust content alignment to bias lower cards upward.
- Rationale: directly addresses “make Validation Notes and Change Reason little upper” without violating equal-halves structure.
- Alternative: increase total panel height. Rejected because it can reintroduce page scroll.

2. Preserve equal-halves contract
- Decision: keep top/bottom split fixed while tuning only inner lower-grid metrics.
- Rationale: avoids regression from prior layout work and keeps visual predictability.
- Alternative: variable row heights. Rejected because it creates inconsistent behavior and whitespace.

3. Contained overflow strategy
- Decision: maintain internal overflow/wrapping for long metadata text rather than allowing panel growth.
- Rationale: keeps important cards in-view and reduces page-level scroll pressure.
- Alternative: unrestricted content growth. Rejected due to viewport instability.

## Risks / Trade-offs

- [Too aggressive compaction may harm readability] -> Mitigation: keep minimum line-height and padding thresholds.
- [Different payload lengths can still trigger internal scrolling] -> Mitigation: preserve controlled overflow within card boundaries.
- [Responsive breakpoints may shift visual priority] -> Mitigation: verify lower-card ordering and visibility across breakpoints.

## Migration Plan

1. Adjust CSS for lower metadata grid spacing/alignment and card internals.
2. Confirm Validation Notes and Change Reason remain visually higher and easier to scan.
3. Update/add tests for panel structure and long-content behavior.
4. Validate in browser across representative viewport sizes.

## Open Questions

- Should Validation Notes and Change Reason have stronger visual priority than the other two metadata cards in future iterations?
- Is a user-controlled compact/comfortable density toggle needed later?
