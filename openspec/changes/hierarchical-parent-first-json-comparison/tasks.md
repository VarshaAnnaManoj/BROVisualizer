## 1. Comparator Traversal Refactor

- [x] 1.1 Identify current ontology comparison entry points and recursive traversal utilities used for Domain/Service/section/item checks
- [x] 1.2 Implement strict parent-first existence checks for Domain Category and Service Category levels
- [x] 1.3 Add short-circuit traversal cutoff so child comparison is skipped when a parent is missing

## 2. Missing-Node Reporting Rules

- [x] 2.1 Add structured missing-node output types for missing domain, missing service, and missing section
- [x] 2.2 Implement section-level missing detection for metadata, explicit_skills, and implicit_skills arrays
- [x] 2.3 Ensure section-missing events suppress child-level missing entries for that section

## 3. Noise Suppression and Output Validation

- [x] 3.1 Implement anti-noise filtering so no descendant diffs are emitted under already-missing ancestors
- [x] 3.2 Preserve child-level diff generation only when corresponding parents and sections exist in both inputs
- [x] 3.3 Verify output contract changes for downstream consumers and update any response schema/tests as needed

## 4. Test Coverage and Regression Safety

- [x] 4.1 Add tests for missing Domain Category with full descendant suppression
- [x] 4.2 Add tests for missing Service Category with section/item suppression
- [x] 4.3 Add tests for missing metadata/explicit_skills/implicit_skills section-level reporting and no child noise
- [x] 4.4 Add positive tests ensuring item-level differences are still emitted when both parents exist
