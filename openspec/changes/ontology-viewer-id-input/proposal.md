## Why

Users currently cannot choose which ontology record to inspect, which limits the viewer to a fixed id and slows analysis workflows. Adding explicit ID input allows users to retrieve and inspect details for any valid ontology row on demand.

## What Changes

- Add a user-editable ontology ID input in the frontend to request specific records for the Ontology JSON Viewer.
- Update frontend data loading logic to fetch ontology and metadata using the entered id instead of a hardcoded value.
- Add validation and error handling for invalid, missing, or not-found IDs while keeping the viewer stable.
- Ensure the backend API usage remains /api/ontology/{id} and /api/ontology/{id}/metadata without requiring new endpoints.

## Capabilities

### New Capabilities
- ontology-viewer-id-selection: Users can enter an ontology id and load corresponding details in Ontology JSON Viewer.

### Modified Capabilities
- None.

## Impact

- Affected frontend: [frontend/src/App.tsx](frontend/src/App.tsx) input controls, loader, and error states.
- Affected API consumption: dynamic calls to /api/ontology/{id} and /api/ontology/{id}/metadata.
- Affected validation UX: input constraints and not-found feedback behavior.
- No database schema or backend route changes required.
