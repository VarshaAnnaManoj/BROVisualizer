## Context

The comparison UI currently uses path-row source viewers in Pre and Post panes to support precise jump targets from Modified Ontology entries. Users requested to restore the previous full JSON viewer presentation in Pre/Post panes because it is easier to scan and familiar for validation workflows. At the same time, Modified Ontology entry navigation must remain functional, and users need an explicit way to return from source context back to the Modified pane.

The design should preserve current diff computation and source routing semantics while changing only the source viewer rendering model and navigation affordances. This is frontend-only and must not affect backend APIs.

## Goals / Non-Goals

**Goals:**
- Restore Pre and Post panes to raw JSON viewer presentation (`JSON.stringify` style block).
- Keep Modified Ontology entry buttons that route to corresponding source context (Pre or Post).
- Provide an explicit “Back to Modified Ontology” control after source-target navigation.
- Preserve accessibility and deterministic behavior across navigation actions.

**Non-Goals:**
- No backend endpoint or contract changes.
- No diff algorithm redesign.
- No new persistence or history features.

## Decisions

1. Decision: Render Pre/Post source viewers as full JSON blocks and highlight target path context externally instead of per-row anchors.
- Rationale: Restores prior user experience while retaining navigation intent.
- Alternative considered: keep row-based source rendering. Rejected due to user request for previous view.

2. Decision: Navigation from Modified entries updates selected source metadata and scrolls/focuses the corresponding Pre/Post panel container.
- Rationale: Works with full JSON viewer format where individual rows are not separately mounted.
- Alternative considered: inject inline anchors into rendered JSON text. Rejected due to complexity and fragility.

3. Decision: Add persistent “Back to Modified Ontology” control near source panes when a source target is active.
- Rationale: Satisfies explicit roundtrip workflow requirement.
- Alternative considered: rely only on Modified pane click/tab change. Rejected because return path should be explicit and discoverable.

4. Decision: Keep changed entry dual actions (Pre/Post) and presence entry single action semantics unchanged.
- Rationale: Preserves already learned interaction model and existing tests with minimal behavioral churn.
- Alternative considered: collapse changed actions into one toggle. Rejected as less direct.

## Risks / Trade-offs

- [Risk] Without row-level anchors, exact intra-JSON location highlighting is less precise. -> Mitigation: show active path metadata and clear source-pane focus styling.
- [Risk] Users may still need manual scan within large JSON blocks. -> Mitigation: include active path label above JSON viewer and auto-scroll/focus to source pane.
- [Risk] Return control visibility might clutter compact layouts. -> Mitigation: show control contextually only when navigation target is active.

## Migration Plan

1. Restore Pre/Post viewer rendering to previous raw JSON block format.
2. Keep Modified entry navigation model and retarget navigation to pane-level focus.
3. Add explicit “Back to Modified Ontology” control and active-path context label.
4. Update tests for restored viewer mode and roundtrip navigation behavior.
5. Run frontend tests and build validation.

Rollback strategy: revert to row-based source viewer implementation if navigation precision issues outweigh readability gains.

## Open Questions

- Should we add optional in-view text search for very large JSON payloads in a follow-up?
- Should Back control return focus to last-clicked Modified button for stronger keyboard continuity?
