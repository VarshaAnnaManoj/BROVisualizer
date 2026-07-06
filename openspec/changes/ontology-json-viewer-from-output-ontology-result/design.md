## Context

The backend and frontend have been migrated toward ontology endpoints, but historical UI behavior and older client calls can still reference legacy records flows. The target behavior is to render ontology JSON in the Ontology JSON Viewer from output_ontology_result in public.br_ontology_evol_output. The current backend already exposes ontology endpoints that can return output_json derived from that column, and the frontend should treat this as the authoritative source for viewer content.

## Goals / Non-Goals

**Goals:**
- Ensure Ontology JSON Viewer data path is explicitly tied to output_ontology_result from public.br_ontology_evol_output.
- Keep frontend request flow on ontology endpoints for viewer rendering.
- Maintain backward-safe endpoint behavior while removing viewer reliance on legacy records structures.

**Non-Goals:**
- Reintroducing or extending legacy /api/v1/records behavior.
- Changing database schema or adding new database tables.
- Building write/create workflows for ontology records in this change.

## Decisions

1. Use ontology endpoint payload as the single source for viewer JSON.
- Decision: Frontend viewer JSON SHALL be sourced from /api/ontology/{id} response output_json, which originates from output_ontology_result.
- Rationale: This avoids duplicative mapping logic and prevents drift between database truth and UI.
- Alternative considered: Direct frontend fetch of raw SQL-backed endpoint specific to viewer.
- Why not chosen: Adds another API contract and increases maintenance overhead without functional gain.

2. Keep metadata retrieval separate but optional for viewer rendering.
- Decision: created_at and display metadata may use /api/ontology/{id}/metadata, while viewer JSON strictly uses output_json.
- Rationale: Separates content payload from display metadata and preserves modular backend handlers.
- Alternative considered: Merge metadata into primary response only.
- Why not chosen: Not required for the change and could affect existing consumers.

3. Preserve stable ontology response contract.
- Decision: No breaking API schema changes are introduced; implementation aligns consumers to current contract.
- Rationale: Minimizes regression risk and allows immediate rollout.
- Alternative considered: Redefine response schema with explicit raw_output_ontology_result field.
- Why not chosen: Existing output_json contract already satisfies viewer needs.

## Risks / Trade-offs

- [Residual stale clients call /api/v1/records and produce log noise] -> Mitigation: maintain frontend on ontology endpoints and document deprecated route behavior.
- [output_ontology_result may contain unexpected non-object JSON in some rows] -> Mitigation: continue defensive JSON parsing and default to empty object for invalid payloads.
- [Hardcoded ontology id used in UI can limit data exploration] -> Mitigation: treat id parameterization as a follow-up capability, outside this scoped change.
