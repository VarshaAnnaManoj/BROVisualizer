## Why

The ontology output flow is currently aligned to the wrong source relation in the data layer. Updating it to use public.vw_br_ontology_evol_output ensures queries and downstream API responses are sourced from the intended canonical view.

## What Changes

- Replace backend data access that currently targets public.br_ocr_image_repository with public.vw_br_ontology_evol_output.
- Align SQLAlchemy model or query configuration so table/view mapping matches the new source relation.
- Preserve existing API contracts and response schema unless data-shape incompatibilities require explicit handling.
- Add or update automated tests to verify reads occur from the new relation and existing endpoints continue to work.

## Capabilities

### New Capabilities
- source-relation-switch: Switch ontology output retrieval to read from public.vw_br_ontology_evol_output instead of public.br_ocr_image_repository.

### Modified Capabilities
- None.

## Impact

- Affected backend model and repository/service query logic that selects ontology output data.
- Potential impacts to tests asserting source relation names or fixture assumptions.
- No intended frontend changes and no intended public API route changes.
