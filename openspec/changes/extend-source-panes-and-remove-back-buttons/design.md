## Context

In comparison mode, users navigate from the Modified pane into both Pre and Post source panes for highlighted JSON paths. The active-source banners currently include duplicate “Back to Modified Ontology” buttons in each pane and consume vertical space that could otherwise be used by the JSON viewers. Users requested that source panes extend downward and remove those two buttons.

## Goals / Non-Goals

**Goals:**
- Increase effective vertical space for Pre and Post JSON viewers when a source target is active.
- Remove redundant per-pane back buttons while preserving clear active path context.
- Keep modified-to-source navigation and highlighting behavior intact.
- Preserve accessibility and keyboard support for main navigation controls.

**Non-Goals:**
- No changes to diff computation logic.
- No backend/API changes.
- No redesign of overall three-pane comparison architecture.

## Decisions

1. Remove duplicated back controls from source banners.
- Decision: Eliminate the per-pane “Back to Modified Ontology” buttons from Pre/Post banners.
- Rationale: They duplicate function and visually crowd the active area without adding unique behavior.
- Alternative considered: Keep one of two buttons conditionally. Rejected because it still introduces banner control noise.

2. Make source panes visually fill down with content area emphasis.
- Decision: Adjust pane/banner/code-view layout so JSON viewer area uses more vertical space and the active target banner is compact.
- Rationale: Addresses user concern about empty lower pane areas and improves readability during deep inspection.
- Alternative considered: fixed larger min-height only. Rejected because it does not reduce banner/control overhead.

3. Keep focus/highlight context without button dependency.
- Decision: Retain focused-path banner text and active-pane highlighting while removing only unnecessary buttons.
- Rationale: Maintains orientation and context while simplifying controls.
- Alternative considered: remove entire banner. Rejected because users still need visible target path context.

## Risks / Trade-offs

- [Risk] Users may miss an explicit return action after removing buttons. -> Mitigation: maintain existing navigation entry points from Modified pane and keep target context visible.
- [Risk] Increased content height may create inconsistent spacing in smaller viewports. -> Mitigation: preserve responsive breakpoints and test stacked mobile layout.
- [Trade-off] Less direct reverse-navigation affordance in source panes. -> Mitigation: ensure source focus clears naturally when navigating new target or returning via primary flow.

## Migration Plan

- Update source banner markup in frontend/src/App.tsx to remove redundant back buttons.
- Update comparison pane layout and code-view sizing rules in frontend/src/App.css so source panes extend downward with improved fill.
- Update regression tests in frontend/src/App.test.tsx to reflect control removal and preserved highlight/navigation behavior.
- Validate with frontend tests and build.

## Open Questions

- Should a single back control be kept in the Modified pane header as an optional future enhancement?
- Should focused-path banner be compacted further on mobile to maximize code-view height?
