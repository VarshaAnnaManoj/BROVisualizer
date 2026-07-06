## Context

In comparison mode, the UI reserves space for a Transformation Summary side panel while the user’s main workflow happens in Pre, Post, and Modified ontology panes. Users requested removing the summary panel, expanding Modified Ontology into that area, and lowering Pre/Post pane positioning because they currently appear visually mid-aligned.

The change is frontend-only and affects layout composition and style rules in frontend/src/App.tsx and frontend/src/App.css, with behavior safeguards in frontend/src/App.test.tsx.

## Goals / Non-Goals

**Goals:**
- Remove Transformation Summary from comparison mode and recover that space for core comparison panes.
- Expand Modified Ontology pane width/space usage where summary panel existed.
- Reposition Pre/Post panes lower so the comparison block starts visually down from current midway alignment.
- Preserve all current diff-navigation, highlight, and keyboard behavior.

**Non-Goals:**
- No changes to backend APIs, data model, or comparison algorithm semantics.
- No redesign of toolbar/header content.
- No changes to single-view mode other than layout compatibility if required.

## Decisions

1. Mode-specific summary rendering.
- Decision: Render summary panel in single mode only; hide it in comparison mode.
- Rationale: Keeps summary available where useful while decluttering comparison workflow.
- Alternative considered: keep summary collapsible in comparison mode. Rejected due to persistent layout crowding.

2. Promote Modified pane to occupy freed layout area.
- Decision: Update comparison grid template so Modified pane expands into former summary footprint.
- Rationale: Maximizes space for actionable diff entries and navigation controls.
- Alternative considered: split space equally among all three panes. Rejected because Modified pane carries interaction density.

3. Lower Pre/Post pane vertical alignment with spacing/offset adjustments.
- Decision: Apply top spacing/alignment rules to comparison pane row so Pre/Post begin lower and align with updated reading flow.
- Rationale: Matches user expectation and improves visual scanning from controls to content.
- Alternative considered: fixed pixel top padding inside code blocks. Rejected due to responsiveness issues.

## Risks / Trade-offs

- [Risk] Removing summary in comparison mode may reduce at-a-glance metrics context. -> Mitigation: keep summary intact in single mode and retain key status tags elsewhere.
- [Risk] Expanded Modified pane can crowd smaller widths. -> Mitigation: tune responsive breakpoints and validate mobile stacking behavior.
- [Trade-off] Lowered pane alignment introduces extra vertical whitespace at some sizes. -> Mitigation: clamp spacing values via media queries.

## Migration Plan

- Update comparison-mode layout rendering in frontend/src/App.tsx.
- Adjust grid and spacing styles in frontend/src/App.css.
- Update tests for comparison-mode structure changes in frontend/src/App.test.tsx.
- Validate via npm run test and npm run build.
- Rollback by reverting touched frontend files if layout regressions appear.

## Open Questions

- Should summary panel be hidden only in comparison mode, or removed globally?
- Should Modified pane expansion favor width only, or both width and height in desktop layout?
