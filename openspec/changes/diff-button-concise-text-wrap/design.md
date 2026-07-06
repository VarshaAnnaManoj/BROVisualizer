## Context

Diff action buttons in the Modified panel currently show long path/value text combinations that wrap awkwardly, create large empty regions, and reduce readability. Users need concise labels and controlled text wrapping so each button clearly communicates target context without visual noise.

The implementation touches frontend rendering in frontend/src/App.tsx and styling in frontend/src/App.css, with behavior verification in frontend/src/App.test.tsx.

## Goals / Non-Goals

**Goals:**
- Reduce perceived whitespace inside diff buttons by tightening content structure.
- Make path/value text concise while preserving enough context for navigation confidence.
- Enforce predictable wrapping and overflow rules so words do not split into unreadable fragments.
- Keep keyboard and click behavior unchanged.

**Non-Goals:**
- No change to backend data contracts.
- No change to diff detection algorithm semantics.
- No global typography redesign outside diff entry components.

## Decisions

1. Introduce concise label formatter for path text.
- Decision: Derive short path hints (for example tail segments) with optional full-path support in aria labels.
- Rationale: Improves scan speed while keeping accessibility context complete.
- Alternative considered: show full path in visual label only. Rejected due to layout bloat.

2. Split button content into structured rows.
- Decision: Keep type badge, concise path text, and value preview in dedicated wrapped blocks.
- Rationale: Prevents inline overflow collisions and random whitespace gaps.
- Alternative considered: truncate everything to one line. Rejected due to information loss.

3. Tight wrapping controls in CSS.
- Decision: Use word-break/overflow-wrap/line-height tuning with max-width-aware text blocks.
- Rationale: Produces stable wrapping across viewport sizes and long tokens.
- Alternative considered: force monospace with horizontal scrolling. Rejected for readability and interaction friction.

## Risks / Trade-offs

- [Risk] Over-aggressive truncation could hide critical path context. -> Mitigation: keep full path in aria label or tooltip/fallback.
- [Risk] Tight wrapping may differ across fonts/browsers. -> Mitigation: add deterministic CSS rules and regression checks.
- [Trade-off] Concise text may slightly reduce raw detail density. -> Mitigation: preserve value snippet and source badge to retain meaning.

## Migration Plan

- Update diff-button content formatting in frontend/src/App.tsx.
- Update button text/wrap styles in frontend/src/App.css.
- Add or adjust tests in frontend/src/App.test.tsx for concise labels and wrapping-safe structure.
- Validate with npm run test and npm run build.
- Rollback by reverting these frontend files if needed.

## Open Questions

- Should full paths be shown on hover as title text for desktop users?
- Do we want a maximum visible path segment count configurable in UI settings?
