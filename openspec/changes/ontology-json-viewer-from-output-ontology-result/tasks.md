## 1. Backend Data Source Validation

- [x] 1.1 Verify ontology API response output_json is derived from output_ontology_result in public.br_ontology_evol_output for requested ids.
- [x] 1.2 Add or update defensive parsing tests to confirm null/invalid output_ontology_result returns an empty object instead of API failure.

## 2. Frontend Viewer Data Flow

- [x] 2.1 Update frontend loader mapping so Ontology JSON Viewer content is built from /api/ontology/{id} output_json.
- [x] 2.2 Remove remaining viewer logic dependencies on /api/v1/records and update UI messaging to ontology endpoint semantics.

## 3. End-to-End Verification

- [x] 3.1 Validate in running app that the Ontology JSON Viewer displays database-backed output_ontology_result content for id=389.
- [x] 3.2 Confirm legacy /api/v1/records unavailability does not block viewer rendering and document verification results.

## Verification Notes

- source_equals_api=True for id=389 when comparing DB output_ontology_result with GET /api/ontology/389 output_json.
- Frontend Ontology JSON Viewer renders raw ontology JSON (top-level keys include Education & Tutoring, Home Improvement & Maintenance).
- Legacy endpoint check: /api/v1/records returns 404 while /api/ontology/389 returns 200, and viewer remains functional.
- Backend tests pass: 6 passed (including new defensive parsing and output source tests).
