## Context

The Ontology JSON Viewer currently retrieves details for a fixed ontology id, which blocks users from inspecting arbitrary records in public.br_ontology_evol_output. Users need a direct input mechanism to provide an id and fetch corresponding ontology JSON and metadata using existing ontology APIs.

## Goals / Non-Goals

**Goals:**
- Allow users to enter an ontology id and load matching data into the Ontology JSON Viewer.
- Keep request flow on existing endpoints: /api/ontology/{id} and /api/ontology/{id}/metadata.
- Provide clear validation/error feedback for invalid or not-found ids without crashing viewer state.

**Non-Goals:**
- Adding new backend endpoints or changing database schema.
- Implementing search, pagination, or autocomplete over ontology ids.
- Introducing write/update behavior for ontology records.

## Decisions

1. Add controlled numeric input for ontology id in frontend state.
- Decision: Use a controlled input field with integer parsing and submit/refresh action to load selected id.
- Rationale: Keeps behavior explicit and predictable while minimizing backend changes.
- Alternative considered: URL query parameter only.
- Why not chosen: Less discoverable in UI and requires manual URL manipulation.

2. Reuse existing loader logic with dynamic id parameter.
- Decision: Replace hardcoded ONTOLOGY_ID with selected id state and pass this id to both ontology and metadata calls.
- Rationale: Minimal implementation risk; preserves tested data path.
- Alternative considered: Create separate loader pathways per id source.
- Why not chosen: Duplicates fetch logic and increases maintenance cost.

3. Preserve last valid viewer data on transient fetch errors.
- Decision: Show error messaging for invalid/not-found ids and avoid destructive state transitions unless explicitly intended.
- Rationale: Better UX for analysis workflows where users compare ids.
- Alternative considered: Always clear viewer on any error.
- Why not chosen: Causes unnecessary information loss during user input mistakes.

## Risks / Trade-offs

- [User enters non-numeric or negative value] -> Mitigation: frontend validation before fetch; block request with inline message.
- [Requested id does not exist] -> Mitigation: handle 404 response and show user-friendly "record not found" message.
- [High-frequency requests due to auto-refresh with frequently changed id] -> Mitigation: refresh loop uses current selected id and can be manually controlled via existing refresh behavior.
