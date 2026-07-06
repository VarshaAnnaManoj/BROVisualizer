## Context

The current ontology viewer flow in the frontend is optimized for loading one selected ontology record and its metadata at a time. The new requirement introduces analytical comparison, where users must inspect two ontology outputs in parallel: a Pre state and a Post state, each resolved by its own `(id, version)` pair. The backend already exposes ontology retrieval behavior by id; this design assumes either existing support for version filtering or a backward-compatible extension to accept version in retrieval for deterministic selection.

Stakeholders are users validating ontology evolution and release quality. Key constraints are: preserve existing single-view behavior, keep API interactions resilient for non-existent pairs, and ensure one pane failure does not block the other.

## Goals / Non-Goals

**Goals:**
- Provide a two-pane comparison mode with distinct Pre and Post sections.
- Support independent pair inputs per pane: `id` and `version`.
- Render two ontology JSON payloads simultaneously in a stable layout.
- Validate user input before calls and present pane-specific errors.
- Support repeated comparisons without page reload.

**Non-Goals:**
- No automatic ontology diff generation in this change.
- No changes to persistence schema or database migrations.
- No replacement of existing single-view screen behavior.
- No bulk compare across multiple pairs.

## Decisions

1. Decision: Introduce explicit comparison-mode state in the frontend.
- Rationale: Keeps legacy single-view flow intact while enabling opt-in side-by-side view.
- Alternative considered: Replacing the existing view completely. Rejected because it would force all users into a more complex interaction model and increase regression risk.

2. Decision: Maintain separate input and fetch lifecycle per pane.
- Rationale: Each pane needs independent loading, success, and error states so one failed lookup does not degrade the opposite pane.
- Alternative considered: A single shared request state for both panes. Rejected because it couples behavior and causes unnecessary blocking.

3. Decision: Resolve pane data using pair keys `(id, version)` and treat them as required inputs.
- Rationale: The requirement explicitly ties result selection to both id and version.
- Alternative considered: Using only id with optional version fallback. Rejected because it can produce ambiguous comparisons.

4. Decision: Use consistent endpoint contract shape for Pre and Post retrieval.
- Rationale: A single retrieval contract simplifies client implementation and testing; the pane identity remains a UI concept.
- Alternative considered: Separate pre/post backend endpoints. Rejected due to redundant API surface and duplicated logic.

5. Decision: Keep errors localized and non-fatal.
- Rationale: Users can still evaluate one valid pane while fixing the other input.
- Alternative considered: Blocking render until both panes succeed. Rejected because it reduces usability for iterative comparisons.

## Risks / Trade-offs

- [Risk] Backend may not currently support strict `(id, version)` resolution. -> Mitigation: define and validate endpoint contract early; add explicit not-found semantics for unmatched pairs.
- [Risk] Two parallel JSON renders can affect performance for large payloads. -> Mitigation: avoid unnecessary re-fetches, memoize parsed payloads, and use lazy rendering for large blocks if needed.
- [Risk] Users may confuse pane context during fast iteration. -> Mitigation: clear labels (`Pre`, `Post`), persistent pane headers, and request summaries near each viewer.
- [Risk] Existing integration tests may not cover dual-pane state transitions. -> Mitigation: add focused tests for partial-failure and dual-success flows.

## Migration Plan

1. Add a frontend comparison mode and pane input controls guarded behind existing view flow.
2. Implement pair-based retrieval calls and pane-local state management.
3. Add UI states and regression checks for single-view behavior.
4. Validate against known valid pair and known invalid pair combinations.
5. Roll out with monitoring; rollback is frontend-only by disabling comparison mode if needed.

## Open Questions

- Should version be numeric-only, semantic, or opaque string? Validation rules must match backend contract.
- Which exact API shape should be canonical for version-qualified retrieval (query parameter vs dedicated path segment)?
- Should metadata be displayed per pane in this phase or only JSON viewer content?
- Is there a maximum payload size where pagination or truncation must be introduced?
