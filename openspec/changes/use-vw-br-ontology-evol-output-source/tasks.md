## 1. Source Relation Update

- [x] 1.1 Identify backend model/repository modules currently sourcing ontology output and confirm where relation mapping is defined.
- [x] 1.2 Replace relation mapping/query source from public.br_ocr_image_repository to public.vw_br_ontology_evol_output.
- [x] 1.3 Add or adjust field mapping logic if the view column names/types differ from current model expectations.

## 2. API Compatibility Validation

- [x] 2.1 Verify ontology endpoint serializers/schemas still produce the same required response fields after source switch.
- [x] 2.2 Update service/repository integration points to preserve existing API contract semantics.

## 3. Test Coverage and Regression Safety

- [x] 3.1 Add or update tests to assert ontology-output reads resolve from public.vw_br_ontology_evol_output.
- [x] 3.2 Add or update tests ensuring no ontology-output read path depends on public.br_ocr_image_repository.
- [x] 3.3 Execute backend test suite subsets for ontology and health routes, then resolve regressions.

## 4. Rollout Checks

- [x] 4.1 Validate key ontology endpoints against a development database with view access permissions.
- [x] 4.2 Document rollback step: restore previous source mapping if post-deploy issues are detected.
