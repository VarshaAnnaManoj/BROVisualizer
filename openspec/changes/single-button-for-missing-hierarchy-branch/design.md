## Context

The compare UI currently supports path-level navigation actions derived from diff entries. With hierarchical ontology JSON, one missing parent branch can imply many missing descendants (metadata arrays, explicit_skills, implicit_skills, and nested values), which creates visual noise and too many action buttons.

## Goals / Non-Goals

**Goals:**
- Render one action/button for a missing hierarchy parent branch (for example, a missing service node like `Duct & Furnace Cleaning`).
- Suppress descendant buttons when the ancestor branch is already represented by a single parent-level missing action.
- Preserve existing granular action behavior for true child-level changes when parent branches exist in both pre and post JSON.
- Keep navigation and highlighting behavior consistent with current pane-targeting logic.

**Non-Goals:**
- No backend API schema redesign beyond existing missing-node/path signals.
- No visual redesign of button styles or panel layout.
- No change to non-hierarchy diffs that are not ancestor-missing cases.

## Decisions

1. Parent-button grouping based on ancestor-missing path detection.
- Decision: Build a suppression set from missing parent paths and prevent generating action buttons for any descendant path under those parents.
- Rationale: Guarantees one-button behavior for parent-missing branches and removes noisy child actions.
- Alternative considered: post-render collapsing of duplicate buttons. Rejected because it is less deterministic and may still create unstable ordering.

2. Single representative action per missing parent branch.
- Decision: Emit exactly one modified entry/button for each missing parent branch using the parent path as canonical action path.
- Rationale: Keeps action list concise and predictable for users.
- Alternative considered: one summary button plus hidden expandable children. Rejected because requirement asks for single button rather than individual entries.

3. Child-level behavior preserved outside suppressed branches.
- Decision: Apply suppression only when a strict ancestor missing condition exists; otherwise leave existing child-level diff generation unchanged.
- Rationale: Avoid regressions for normal changed-node workflows.
- Alternative considered: broad deduplication across all paths. Rejected due to risk of dropping legitimate child changes.

## Risks / Trade-offs

- [Risk] Over-suppression could hide valid child actions when parent is not truly missing. -> Mitigation: only suppress descendants of explicit missing-node/branch entries.
- [Risk] Path normalization mismatches may miss grouping for some branches. -> Mitigation: reuse existing path normalization utilities and add tests with real service names containing spaces/symbols.
- [Trade-off] Users lose per-child action buttons in missing-parent scenarios. -> Mitigation: this is intentional and aligned with signal-first UX.

## Migration Plan

- Update compare action derivation logic in frontend to construct grouped parent missing actions.
- Add tests for missing service/section branches that previously produced multiple buttons.
- Validate no regression for non-missing-ancestor child changes.
- Roll back by disabling grouping logic if downstream behavior becomes incompatible.

## Open Questions

- Should grouped parent action label include a child-count summary (for example, "+12 nested changes") or remain path-only?
- Should section-level missing branches (metadata/explicit_skills/implicit_skills) also be promoted to one parent action when service-level parent already missing? (Current plan: yes, via ancestor suppression.)
