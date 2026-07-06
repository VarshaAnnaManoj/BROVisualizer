## Context

The application currently shows JSON primarily in pre/post ontology comparison panels. Users now need a focused JSON viewer and formatter experience similar to dedicated online JSON tools for ad-hoc inspection and data debugging without leaving the app.

## Goals / Non-Goals

**Goals:**
- Provide a dedicated mode/page for JSON viewing and formatting.
- Support JSON input, parse validation, pretty-print, minify, and clear/reset actions.
- Render JSON as an interactive tree with expandable/collapsible nodes.
- Add search/filter support across keys and scalar values.
- Keep existing ontology comparison behavior unchanged.

**Non-Goals:**
- Not implementing JSON schema authoring/validation in this iteration.
- Not adding server-side JSON storage or collaboration features.
- Not replacing current ontology comparison panes with this viewer.

## Decisions

- Build the viewer as a separate UI mode/component within frontend to avoid regressions in existing compare flows.
  - Rationale: isolates complexity and allows incremental rollout.
- Use a tree data model derived from parsed JSON with stable path identifiers.
  - Rationale: enables efficient expand/collapse and search highlighting.
- Implement parsing/formatting via native JSON parse/stringify with error reporting.
  - Rationale: low dependency footprint and predictable behavior.
- Add virtualization/performance guardrails if rendered node count exceeds threshold.
  - Rationale: avoid browser lockups for large payloads.

## Risks / Trade-offs

- [Risk] Large JSON payloads may cause slow rendering -> Mitigation: lazy expand children and optional virtualization.
- [Risk] Search across huge trees can be expensive -> Mitigation: debounce search input and incremental traversal.
- [Risk] Users may confuse compare mode and viewer mode -> Mitigation: clear mode labels and explicit navigation entry.

## Migration Plan

- Add viewer UI behind an explicit route/tab in frontend.
- Implement parser/formatter actions and tree rendering utilities.
- Add tests for parse errors, format actions, and node toggle/search interactions.
- Rollback by hiding/removing viewer route while retaining core comparison workflows.

## Open Questions

- Should user edits in the viewer persist across refresh/session?
- Do we need copy-as-path/copy-node actions in v1 or a follow-up?
