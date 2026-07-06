## Context

The comparison UI currently derives Modified entries from Pre and Post JSON, then navigates to a source highlight target when users click diff actions. Two gaps remain: change detection/mapping is inconsistent for unnamed nodes (for example anonymous object/array members), and source navigation only emphasizes one pane at a time instead of synchronizing both panes for side-by-side verification.

The implementation surface is frontend-only: diff/path logic and render/highlight behavior in frontend/src/App.tsx, styling in frontend/src/App.css, and behavior tests in frontend/src/App.test.tsx.

## Goals / Non-Goals

**Goals:**
- Ensure modifications are represented for both named nodes (category/capability keys) and unnamed nodes (index-based or unlabeled structures).
- Make diff-entry navigation scroll both Pre and Post panes to corresponding highlighted locations.
- Keep highlight targeting deterministic for repeated keys and mixed array/object shapes.
- Preserve current legend semantics (Pre-only, Post-only, changed values) and keyboard accessibility.

**Non-Goals:**
- No backend or database changes.
- No redesign of panel layout or modified-entry taxonomy.
- No new dependency introduction.

## Decisions

1. Unified lineage path model for named and unnamed nodes.
- Decision: Normalize path representation into lineage-aware keys that include object segments and array selectors (index and keyed id forms where available).
- Rationale: A single model avoids divergent behavior between named and unnamed nodes.
- Alternative considered: Separate named vs unnamed comparators. Rejected because it increases duplication and mismatch risk.

2. Dual-pane scroll orchestration from one action.
- Decision: On diff action click, resolve targets for both panes and scroll each pane to its highlighted range if present.
- Rationale: Supports immediate side-by-side validation without extra clicks.
- Alternative considered: Keep single-pane focus with toggle. Rejected due to extra user steps.

3. Controlled fallback hierarchy.
- Decision: If exact target is missing in one pane, fallback within same lineage scope and still scroll the other pane to exact/nearest target.
- Rationale: Maintains useful context while preventing unrelated jumps.
- Alternative considered: disable scroll when one pane misses target. Rejected because it hides available evidence.

## Risks / Trade-offs

- [Risk] Dual-scroll can feel jumpy on very long JSON payloads. -> Mitigation: use smooth scrolling and avoid repeated scroll triggers during rapid clicks.
- [Risk] Unnamed-node path mapping may create ambiguous matches in deeply nested arrays. -> Mitigation: require full lineage match first, then nearest-lineage fallback.
- [Trade-off] Showing fallback highlight may be less precise than exact matches. -> Mitigation: preserve focused path metadata and test fallback boundaries.

## Migration Plan

- Update path normalization and highlight-range resolution in frontend/src/App.tsx.
- Add synchronized scroll helpers for Pre/Post panes in frontend/src/App.tsx.
- Adjust style hooks only as needed in frontend/src/App.css.
- Add regression tests for named/unnamed node coverage and dual-pane scroll behavior in frontend/src/App.test.tsx.
- Validate with npm run test and npm run build.

## Open Questions

- Should users be able to disable dual-pane auto-scroll for large payloads?
- Should fallback state explicitly label approximate match when exact target is unavailable?
