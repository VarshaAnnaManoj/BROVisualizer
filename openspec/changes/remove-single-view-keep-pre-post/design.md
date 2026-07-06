## Context

The frontend currently supports two viewer modes: Single and Pre/Post Compare. Product direction now requires removing Single mode entirely and keeping only the Pre/Post comparison workflow. This change is frontend-only but affects state initialization, toolbar controls, rendering branches, and existing tests.

## Goals / Non-Goals

**Goals:**
- Make Pre/Post comparison the only viewer mode and default experience.
- Remove Single-mode controls and behavior paths from UI state and rendering.
- Keep existing Pre/Post functionality intact after mode removal.
- Add regression tests for mode control removal and compare-default behavior.

**Non-Goals:**
- No backend API or database changes.
- No redesign of compare pane layout, diff schema, or data model.
- No new dependencies.

## Decisions

1. Remove mode toggle bifurcation and enforce comparison mode.
- Decision: Replace dual-mode state branching with a single comparison-centric rendering path.
- Rationale: Eliminates dead branches and prevents future regressions caused by stale Single mode code.
- Alternative considered: Hide Single button but keep code path. Rejected because hidden behavior still increases complexity and maintenance risk.

2. Keep data loading centered on pane-specific requests.
- Decision: Use existing Pre/Post pane loading flow as the sole data-fetch path and remove Single-specific fetch loop.
- Rationale: Matches desired workflow and avoids duplicate fetch logic.
- Alternative considered: Keep shared fetch helper with Single compatibility. Rejected because it preserves an obsolete state model.

3. Update tests to assert absence and default compare behavior.
- Decision: Convert current mode-toggle assumptions into assertions that comparison controls and panes are always present while Single controls are absent.
- Rationale: Prevents accidental reintroduction of removed mode.
- Alternative considered: Leave tests as-is with minimal edits. Rejected because coverage would not protect the new product requirement.

## Risks / Trade-offs

- [Risk] Removing shared state paths might introduce regressions in refresh/load sequencing. -> Mitigation: add focused tests for initial render and pane load interactions.
- [Risk] Existing users may expect Single-mode shortcut behavior. -> Mitigation: ensure comparison mode loads reliably on first render and controls remain clear.
- [Trade-off] Reduced mode flexibility by design. -> Mitigation: document this as intentional product scope in specs and tasks.

## Migration Plan

- Implement frontend mode/state cleanup and remove Single UI controls.
- Update tests for compare-only behavior.
- Run frontend tests and build validation.
- Deploy frontend update with no backend migration.
- Rollback by reverting frontend UI/state/test changes if needed.

## Open Questions

- Should the Compare button label be simplified once it becomes the only mode?
- Should any telemetry event be added for removed Single mode usage path (if historical usage tracking exists)?
