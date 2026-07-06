## Context

Bubble navigation controls currently appear in a centralized location, which disconnects them from the pane they affect. The requested change is to place bubbles in their respective Pre or Post pane locations, so users can navigate source-specific differences from within the matching pane area. The change is frontend-only and should keep existing navigation/highlight semantics.

## Goals / Non-Goals

**Goals:**
- Move bubble actions to respective Pre and Post locations.
- Keep ordering stable and source-specific (Pre-target bubbles in Pre area, Post-target in Post area).
- Preserve click and keyboard behavior, aria labels, and active/focus states.
- Avoid visual clutter and maintain responsive usability.

**Non-Goals:**
- No backend diff API or computation changes.
- No changes to ontology loading flow.
- No new diff semantics beyond action placement.

## Decisions

1. Split actions by target pane and render near each respective pane.
- Decision: Derive two action collections (Pre and Post) from existing diff action sources and render each in its matching pane region.
- Rationale: Directly aligns controls with the affected pane and reduces cognitive switching.
- Alternative considered: duplicate all actions in both panes. Rejected due to duplication and ambiguity.

2. Preserve existing action identity and navigation handlers.
- Decision: Reuse existing path-based aria labels and navigation callbacks for each bubble action.
- Rationale: Keeps behavior stable and minimizes regression risk.
- Alternative considered: new handler contracts per pane. Rejected as unnecessary complexity.

3. Keep numbering stable per rendered pane action list.
- Decision: Number bubbles in deterministic order within each pane action group.
- Rationale: Maintains predictable scanning and interaction after data refresh.
- Alternative considered: global numbering across both panes. Rejected because local pane placement is primary.

## Risks / Trade-offs

- [Risk] Two action strips can create asymmetry if one pane has many actions. -> Mitigation: responsive wrapping and compact bubble sizing.
- [Risk] Existing tests tied to centralized location may fail. -> Mitigation: update tests to assert per-pane placement and unchanged behavior.
- [Risk] Action ordering bugs during re-render. -> Mitigation: derive order from stable source arrays and verify with tests.

## Migration Plan

- Refactor action derivation to separate Pre and Post bubble lists.
- Render bubble strips in the respective pane areas.
- Remove or de-emphasize old centralized bubble placement.
- Update tests for placement and behavior.
- Run frontend tests and build.

## Open Questions

- Should each pane display only its own actions or also show cross-pane references in a secondary style?
- If a pane has zero actions, should its strip be hidden or show an empty placeholder?
