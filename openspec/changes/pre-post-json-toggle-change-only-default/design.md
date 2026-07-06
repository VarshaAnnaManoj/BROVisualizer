## Context

Users need fast focus on meaningful differences in Pre/Post panes, but complete JSON is still necessary for deeper inspection. The requested behavior is a top toggle with two options (`Change Only`, `Complete JSON`) for each pane, with default mode set to `Change Only`.

## Goals / Non-Goals

**Goals:**
- Add a clear two-option toggle control at the top of Pre and Post viewers.
- Default each pane to `Change Only` mode on load.
- Allow users to switch to `Complete JSON` and see full pane JSON content.
- Keep interaction predictable during ID/version updates and refresh actions.

**Non-Goals:**
- No backend API changes.
- No redesign of modified diff panel behavior.
- No changes to metadata side panel behavior.

## Decisions

1. Per-pane mode state.
- Decision: Track mode independently for Pre and Post panes so users can inspect different modes side-by-side if needed.
- Rationale: Maximizes flexibility and aligns with pane-level controls.
- Alternative considered: one global mode toggle for both panes. Rejected due to reduced inspection flexibility.

2. Default mode set at initialization.
- Decision: Initialize pane mode state to `change-only` for both panes.
- Rationale: Matches requested default and prioritizes signal over verbosity.
- Alternative considered: retain current full-json default. Rejected per requirement.

3. Change-only rendering strategy.
- Decision: In `change-only`, render only paths relevant to current compare diffs for the pane; in `complete-json`, render entire pane JSON.
- Rationale: Directly satisfies “default changes only, optional full json” behavior.
- Alternative considered: highlight-only full-json mode. Rejected because it still presents full payload by default.

## Risks / Trade-offs

- [Risk] Change-only extraction could miss context users expect. -> Mitigation: ensure quick mode switch to complete JSON with no data loss.
- [Risk] Additional control complexity in pane header. -> Mitigation: concise two-state toggle with clear labels.
- [Trade-off] More client-side filtering logic. -> Mitigation: reuse existing diff/path utilities where possible.

## Migration Plan

- Add pane-level viewer mode state and toggle controls.
- Implement mode-specific JSON rendering for Pre and Post panes.
- Add tests for default mode, mode switch behavior, and content rendering.
- Validate no regressions in compare navigation and highlight behavior.

## Open Questions

- Should mode selection persist across session reloads or remain in-memory only? (Current intent: in-memory only.)
- In change-only mode, should parent containers be retained for context when only deep child paths changed?
