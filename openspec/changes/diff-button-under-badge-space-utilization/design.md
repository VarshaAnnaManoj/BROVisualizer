## Context

Diff buttons in presence-difference rows currently place the PRE ONLY/POST ONLY badge next to path/value text, which can leave awkward whitespace beneath the badge and make the button body feel uneven. Users asked to utilize the space under the badge so each button appears denser, clearer, and easier to scan.

The change is frontend-only and primarily affects diff-button markup in frontend/src/App.tsx and styling in frontend/src/App.css, with test expectations in frontend/src/App.test.tsx.

## Goals / Non-Goals

**Goals:**
- Reorganize button content so useful text occupies the region under PRE ONLY/POST ONLY badges.
- Keep labels concise and readable without reintroducing long, cluttered path lines.
- Preserve full-path accessibility labels and navigation behavior.
- Maintain responsive layout quality and avoid whitespace-heavy button cards.

**Non-Goals:**
- No changes to diff generation semantics or backend responses.
- No redesign of overall comparison panel structure.
- No removal of PRE/POST badge semantics.

## Decisions

1. Stack textual content under the badge.
- Decision: Use a two-row button content model where badge anchors top-left and path/value text fills the area below/adjacent with controlled wrapping.
- Rationale: Directly addresses the empty-region problem while preserving visual hierarchy.
- Alternative considered: horizontal compact row only. Rejected because it still leaves under-badge voids on longer labels.

2. Prioritize concise path hint + short value preview.
- Decision: Display condensed path text and trimmed value preview inside the text block while keeping full path in aria labels/title.
- Rationale: Better information density and readability.
- Alternative considered: full path in body text. Rejected due to clutter and wrapping instability.

3. Keep interaction semantics unchanged.
- Decision: Retain button roles, keyboard activation, and active/focus classes.
- Rationale: Layout improvements should not alter behavior expectations.
- Alternative considered: nested interactive text regions. Rejected for accessibility complexity.

## Risks / Trade-offs

- [Risk] Condensed labels may hide branch context in edge cases. -> Mitigation: preserve full path in aria label/title.
- [Risk] New stacked layout could over-compress on small screens. -> Mitigation: responsive CSS fallbacks and spacing tests.
- [Trade-off] Slightly more vertical text may increase row height. -> Mitigation: trim value preview and tune line-height.

## Migration Plan

- Update diff button JSX structure in frontend/src/App.tsx to use under-badge text blocks.
- Tune CSS grid/flow rules in frontend/src/App.css to fill under-badge space efficiently.
- Add/update tests in frontend/src/App.test.tsx for concise text visibility and preserved navigation labels.
- Validate with npm run test and npm run build.

## Open Questions

- Should value preview be hidden when path already consumes two lines?
- Should hover tooltips show both full path and full value for advanced inspection?
