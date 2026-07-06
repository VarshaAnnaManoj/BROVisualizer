## 1. UI Model Extension

- [x] 1.1 Extend comparison state to include a `Modified Ontology` set with id, version, loading, error, and JSON result fields.
- [x] 1.2 Add shared helper logic so submit/retry/validation behavior can be reused across Pre, Post, and Modified sets.
- [x] 1.3 Preserve existing Pre/Post defaults and interactions while adding the new set.

## 2. Modified Ontology Interface

- [x] 2.1 Add a visible `Modified Ontology` section with Ontology ID and Version ID inputs.
- [x] 2.2 Add a JSON result panel for `Modified Ontology` aligned with existing comparison layout.
- [x] 2.3 Update responsive styles so three sections remain readable across desktop and mobile widths.

## 3. Data Retrieval And Isolation

- [x] 3.1 Wire `Modified Ontology` submission to existing ontology endpoints using `(id, version)`.
- [x] 3.2 Implement section-local validation and prevent requests when `Modified Ontology` input is incomplete.
- [x] 3.3 Keep loading/error/retry handling isolated so failures in one section do not reset the others.

## 4. Verification

- [x] 4.1 Add/update frontend tests for three-set rendering and independent input isolation.
- [x] 4.2 Add/update frontend tests for Modified success, Modified validation failure, and mixed outcome scenarios.
- [x] 4.3 Run frontend tests and build to verify no regressions in existing Pre/Post behavior.