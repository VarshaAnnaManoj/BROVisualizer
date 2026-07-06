## Context

The Modified Ontology panel currently renders each difference action as a full text button, which increases visual noise and horizontal crowding when many differences are present. The request is to present these actions as compact numbered bubbles while preserving current behavior: selecting an item still navigates and highlights the correct target. The implementation should remain frontend-only and align with existing compare-mode interaction patterns.

## Goals / Non-Goals

**Goals:**
- Render each difference action as an ordered numbered bubble in the Modified Ontology list.
- Preserve existing interaction semantics, including click behavior, keyboard operation, focus visibility, and active-state indication.
- Keep an understandable label context so users can map bubble index to the associated difference.
- Ensure the bubble presentation remains usable across desktop and responsive widths.

**Non-Goals:**
- No backend API changes or changes to diff generation logic.
- No rewrite of compare panel architecture.
- No alteration to which differences are included; only presentation and interaction styling change.

## Decisions

1. Introduce indexed bubble action styling in the existing action list.
- Decision: Keep current action data model and event handlers, but render a compact circular index control with the ordinal number for each action.
- Rationale: Lowest-risk change that preserves tested behavior while improving scanability.
- Alternative considered: Replace actions with a separate paginated navigator. Rejected due to larger UX and logic changes.

2. Preserve accessible semantics and active-state behavior.
- Decision: Continue using button elements with existing labels and active-state classes/attributes, adding bubble-specific visual treatment only.
- Rationale: Maintains keyboard and screen-reader support while minimizing regressions.
- Alternative considered: Div-based clickable chips. Rejected due to weaker semantics and accessibility risk.

3. Keep readable difference context near each bubble.
- Decision: Pair each bubble index with concise text context in the same action row so users can identify what each index represents.
- Rationale: Number-only controls are ambiguous without nearby context.
- Alternative considered: Tooltip-only context. Rejected because it adds hover dependency and reduces quick scannability.

## Risks / Trade-offs

- [Risk] Overly small bubbles can reduce click accuracy. -> Mitigation: enforce minimum hit area and clear focus ring.
- [Risk] Numbered styling could reduce textual clarity if context is visually de-emphasized. -> Mitigation: keep concise label visible adjacent to bubble.
- [Risk] CSS updates may unintentionally affect other chip/button variants. -> Mitigation: scope new selectors to Modified Ontology action container.

## Migration Plan

- Update Modified Ontology action rendering to include ordinal display for each action.
- Add scoped CSS classes for bubble shape, spacing, hover/active/focus states.
- Run and update frontend tests for rendering and interaction semantics.
- If visual regression appears, revert scoped bubble class usage without touching data/handler logic.

## Open Questions

- Should the numbering restart by group/section or remain global for the full rendered difference list?
- Should mobile collapse the text context to conserve space, or keep the same bubble plus label layout?
