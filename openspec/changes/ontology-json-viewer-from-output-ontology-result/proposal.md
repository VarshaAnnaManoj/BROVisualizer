## Why

The UI still has legacy behavior mixed in, and the Ontology JSON Viewer must reliably represent database-backed ontology output. Now that database connectivity is stable, the viewer should read from output_ontology_result so users always see authoritative ontology JSON from public.br_ontology_evol_output.

## What Changes

- Ensure backend data flow for ontology endpoints is sourced from public.br_ontology_evol_output, specifically output_ontology_result for JSON content shown in the viewer.
- Update frontend data mapping so the Ontology JSON Viewer renders ontology JSON derived from output_ontology_result rather than legacy records payload structures.
- Remove or avoid any remaining dependency on legacy /api/v1/records behavior for viewer content.
- Keep existing ontology endpoint contract stable for current consumers while aligning the UI to the ontology endpoints already in use.

## Capabilities

### New Capabilities
- ontology-json-viewer-output-source: Display ontology JSON in the viewer from output_ontology_result in public.br_ontology_evol_output via ontology APIs.

### Modified Capabilities
- None.

## Impact

- Affected backend: ontology repository and service usage path for viewer-related payload integrity.
- Affected frontend: viewer data mapping in App-level data loader and JSON rendering block.
- Affected API usage: frontend should consume /api/ontology/{id} (and metadata endpoint as needed) for viewer content.
- No new infrastructure dependencies expected.
