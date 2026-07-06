## Context

A frontend foundation exists, but the current screen output does not match the intended Figma node 5:7 visual design. The objective of this change is to realign implemented UI with the approved frame while preserving the existing component architecture, responsive behavior, and accessibility baseline.

## Goals / Non-Goals

**Goals:**
- Achieve visual fidelity to Figma node 5:7 for desktop composition.
- Preserve design intent across tablet and mobile breakpoints.
- Keep styling changes token-driven and maintainable.
- Retain interaction clarity and accessibility behavior during visual refinements.

**Non-Goals:**
- Introduce backend integration, API wiring, or data model changes.
- Rebuild the app architecture from scratch.
- Add new product features unrelated to visual alignment.

## Decisions

- Keep existing React component boundaries and refine styling/layout within that structure to minimize regression risk.
- Use a token-first approach for color, spacing, typography, radius, and shadow changes to prevent style drift.
- Prioritize desktop fidelity first, then adjust tablet/mobile behavior to maintain hierarchy and readability.
- Validate each refinement pass with build/lint checks and visual comparison checkpoints.

## Risks / Trade-offs

- [Incomplete Figma measurement access] -> Mitigation: use screenshot-based comparison with iterative refinement and explicit acceptance criteria.
- [Overfitting desktop at expense of mobile] -> Mitigation: run breakpoint verification after each major style adjustment.
- [Regression in interaction visibility] -> Mitigation: preserve and re-test hover/focus/active and keyboard navigation states.

## Migration Plan

1. Capture visual gap between current UI and Figma node 5:7.
2. Apply token and component-level style refinements for desktop fidelity.
3. Adjust responsive rules for tablet/mobile fidelity preservation.
4. Re-validate interaction/accessibility states and build quality.
5. Complete screenshot-based verification and document final alignment status.

## Open Questions

- Are exact Figma font files and exported assets available for final pass?
- Which deviation tolerance is acceptable for spacing and typography differences during review?
