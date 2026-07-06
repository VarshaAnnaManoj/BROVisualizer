## Context

The backend serves ontology-related data through FastAPI endpoints and currently resolves source data through model/repository wiring that is not aligned with the intended canonical relation. The requested change is to source data from public.vw_br_ontology_evol_output rather than public.br_ocr_image_repository while preserving current API behavior.

Constraints:
- Existing API routes and response schemas should remain stable.
- The source relation is a database view, so write semantics are out of scope for this change.
- Existing tests should continue to pass with minimal fixture churn.

## Goals / Non-Goals

**Goals:**
- Ensure ontology-output reads target public.vw_br_ontology_evol_output.
- Keep endpoint contracts stable for frontend consumers.
- Add coverage that detects accidental regression to the old source relation.

**Non-Goals:**
- Introducing new API endpoints or response fields.
- Changing frontend behavior or UI flows.
- Refactoring unrelated repository/service modules.

## Decisions

1. Source mapping decision
- Decision: Update the backend mapping (model table mapping and/or query source) to public.vw_br_ontology_evol_output.
- Rationale: Centralizes source-of-truth at the data-access layer and avoids endpoint-level branching.
- Alternative considered: Route-level SQL override. Rejected because it duplicates source logic and is harder to maintain.

2. Compatibility decision
- Decision: Preserve current schema contracts and normalize any view column naming differences in repository/service code.
- Rationale: Avoids frontend/API breaking changes while allowing source migration.
- Alternative considered: Exposing new response shape to match view columns directly. Rejected due to avoidable consumer impact.

3. Verification decision
- Decision: Add/update automated tests to assert data retrieval from the new relation and successful endpoint responses.
- Rationale: Prevents future regressions and documents expected data source behavior.
- Alternative considered: Manual verification only. Rejected as insufficient for ongoing maintenance.

## Risks / Trade-offs

- [View schema drift from expected model columns] -> Mitigation: Add explicit field mapping and tests against representative rows.
- [Performance differences between table and view] -> Mitigation: Keep query scope minimal and monitor endpoint latency after deploy.
- [Hidden dependency on old relation name in tests] -> Mitigation: Update fixtures/assertions and add targeted relation-source checks.

## Migration Plan

1. Update model/repository source relation to public.vw_br_ontology_evol_output.
2. Run backend tests and adjust fixtures for view-backed reads where needed.
3. Validate key ontology endpoints in a dev environment.
4. Deploy with rollback option: revert source mapping commit to restore previous relation.

## Open Questions

- Does the view expose fully equivalent columns for all fields currently returned by ontology endpoints?
- Are there environment-specific permissions required for selecting from public.vw_br_ontology_evol_output?
