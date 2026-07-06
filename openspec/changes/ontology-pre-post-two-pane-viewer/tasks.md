## 1. API Contract And Backend Support

- [x] 1.1 Confirm existing ontology endpoint supports strict (id, version) lookup; document canonical request shape.
- [x] 1.2 Implement backend retrieval by (id, version) if missing, preserving current id-only behavior for legacy flow.
- [x] 1.3 Return deterministic not-found responses for unmatched (id, version) pairs and keep error payloads consistent.
- [x] 1.4 Add or update backend tests for valid pair resolution and invalid pair not-found cases.

## 2. Frontend Comparison Mode Foundation

- [x] 2.1 Add comparison-mode state and entry mechanism while preserving the existing single-view default.
- [x] 2.2 Build two-pane layout with persistent Pre and Post labels and independent viewer containers.
- [x] 2.3 Add independent input controls per pane for id and version with pane-local form state.

## 3. Data Fetching, Validation, And Pane Isolation

- [x] 3.1 Implement pane-local validation that blocks submit when id or version is missing/invalid.
- [x] 3.2 Wire pane-specific requests using each pane's (id, version) pair and prevent cross-pane request coupling.
- [x] 3.3 Implement pane-local loading, success, and error states so one pane failure does not block the other.
- [x] 3.4 Render ontology JSON per pane from returned payloads and support retrying only the failed pane.

## 4. Regression And Verification

- [x] 4.1 Verify legacy single-view flow remains functional and does not require comparison controls.
- [x] 4.2 Add frontend tests for dual-success, single-pane failure, and input-validation scenarios.
- [x] 4.3 Manually validate with known pairs: valid (e.g., 300), invalid (e.g., 999999999), and mixed success/failure.
- [x] 4.4 Update change notes if needed with test evidence and known limitations.