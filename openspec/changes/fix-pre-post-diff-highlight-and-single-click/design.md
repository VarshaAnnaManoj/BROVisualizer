## Context

The Pre/Post comparison workflow currently over-highlights source JSON when an item exists only on one side, which can make entire sections appear changed even when only a single capability entry differs. Users also report that the Single mode toggle requires a double click in practice, causing interaction friction and uncertainty about active mode state. In addition, attachment placeholder labels such as "Pasted Image" and "Pasted Image#3" are shown where they are not needed.

The change is frontend-focused and touches comparison highlighting logic, click-handling/state transitions for mode controls, and UI content filtering for attachment placeholders.

## Goals / Non-Goals

**Goals:**
- Restrict highlight scope to the specific changed or missing JSON entry for Pre/Post comparison.
- Ensure the Single mode button responds on first click and transitions view mode deterministically.
- Suppress attachment placeholder labels from the visible workflow output.
- Add regression tests for all three behaviors.

**Non-Goals:**
- No backend API contract changes.
- No database schema or data migration.
- No redesign of the broader layout beyond behavior fixes.

## Decisions

1. Path-scoped highlight resolution over block-level fallback.
- Decision: Resolve highlight anchors from diff path tokens and constrain rendered highlight ranges to the smallest matching JSON node.
- Rationale: Users need exact targeting when only one capability or category entry is missing.
- Alternative considered: Keep broad fallback highlight for unresolved paths. Rejected because it creates false-positive visual emphasis.

2. Single-click mode transition with centralized event handling.
- Decision: Route view-mode updates through one click path and remove timing/race-sensitive toggling behavior.
- Rationale: Ensures button intent is applied once per click and avoids requiring repeated clicks.
- Alternative considered: Debounce click updates. Rejected because it can mask state bugs and delay UI response.

3. Explicit placeholder suppression at render layer.
- Decision: Filter out placeholder attachment labels matching unwanted patterns (for example, "Pasted Image" and numbered variants) before rendering.
- Rationale: Prevents noisy UI artifacts without requiring upstream attachment-source changes.
- Alternative considered: Hide via CSS only. Rejected because hidden-but-present content can still affect accessibility and tests.

## Risks / Trade-offs

- [Risk] Diff path resolution may still face ambiguity in repeated key structures. -> Mitigation: add scenario tests for repeated keys and side-specific missing entries.
- [Risk] Refactoring mode click handlers can unintentionally alter other mode transitions. -> Mitigation: add interaction tests for Single and compare-mode switching sequence.
- [Trade-off] Placeholder suppression by pattern may hide legitimate labels with similar names. -> Mitigation: keep matching narrow and covered by explicit tests.

## Migration Plan

- Implement frontend logic changes in comparison/highlight and mode button handling.
- Implement placeholder suppression in UI rendering path.
- Add regression tests and run frontend test suite.
- Deploy with standard frontend release flow.
- Rollback by reverting frontend behavior/test files if regressions appear.

## Open Questions

- Should placeholder suppression be strict exact-match only, or include case-insensitive numbered variants?
- Should the UI surface an informational count for suppressed placeholders, or remain silent?
