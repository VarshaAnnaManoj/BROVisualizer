## Context

The comparison experience has three panes: Pre JSON, Post JSON, and Modified Ontology. Users can click Modified entries to navigate to a source context, and the app currently shows target metadata plus active-pane emphasis. However, users still need stronger visual confirmation of the exact source section to reduce scanning effort after navigation.

The code path primarily lives in `frontend/src/App.tsx` for navigation state and rendering, with visual states in `frontend/src/App.css` and behavior validation in `frontend/src/App.test.tsx`. Constraints include preserving current Modified action semantics, maintaining keyboard accessibility, and avoiding regressions in roundtrip navigation.

## Goals / Non-Goals

**Goals:**
- Improve click-through clarity so Modified button selection focuses the corresponding source section context in the selected viewer.
- Add a clear background highlight for the active source section state so users can immediately orient after navigation.
- Preserve existing Pre/Post JSON block viewer format and Back-to-Modified behavior.
- Keep interaction accessible with keyboard and visible focus treatment.

**Non-Goals:**
- No backend/API changes.
- No diff algorithm changes or new data extraction logic.
- No redesign of pane structure, toolbar behavior, or summary panel.

## Decisions

1. Maintain pane-level source targeting and strengthen section-level presentation state.
- Decision: Keep `activeTarget` as the primary navigation state and render a dedicated active-section container in the source pane that includes path context and action controls.
- Rationale: Existing behavior already routes correctly by pane/path; strengthening visual treatment minimizes logic churn and regression risk.
- Alternative considered: Reintroducing per-path anchor rows in source panes. Rejected because it conflicts with restored full JSON viewer requirement and increases DOM complexity.

2. Use explicit active background tokens/classes for source section emphasis.
- Decision: Introduce/extend CSS classes for highlighted source context background, border contrast, and focus ring compatibility.
- Rationale: CSS-only visual emphasis is low-risk and can be tuned quickly for desktop/mobile readability.
- Alternative considered: Inline styles from React state. Rejected to keep styling centralized and test-friendly.

3. Preserve and harden keyboard roundtrip controls.
- Decision: Keep source action buttons as semantic `<button>` elements and ensure Enter/Space activate return behavior consistently.
- Rationale: Protects accessibility while avoiding custom key handling across non-button elements.
- Alternative considered: Making banner area itself interactive. Rejected due to poorer semantics and discoverability.

## Risks / Trade-offs

- [Risk] Stronger background highlight may reduce contrast with existing diff chips in narrow layouts.
  - Mitigation: Limit highlight to source context container and verify responsive rendering at mobile breakpoints.
- [Risk] Focus and scroll behavior can vary in test/browser environments.
  - Mitigation: Keep deterministic state assertions in tests (class/banner/presence) instead of brittle scroll expectations.
- [Trade-off] Pane-level focus emphasizes context rather than exact inline line-level JSON fragment.
  - Mitigation: Continue showing explicit path metadata in the highlighted section.

## Migration Plan

- Implement visual and focus-state updates in `App.tsx` and `App.css` behind existing navigation flow.
- Update behavior tests in `App.test.tsx` to validate source focus context and background-highlight state.
- Verify with `npm run test` and `npm run build` in frontend.
- Rollback strategy: revert the change set in these three frontend files if regressions are found.

## Open Questions

- Should source highlight colors use the current neutral palette or introduce role-based variants (Pre vs Post)?
- Should active source context auto-clear after timeout, or remain until explicit return action (current direction: remain until explicit action)?
