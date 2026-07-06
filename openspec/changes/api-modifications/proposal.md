## Why

The current backend exposes only list and create operations for records, which limits operational workflows and makes record lifecycle management incomplete. We need fuller API coverage now so frontend and integrations can retrieve, update, and remove records in a predictable and documented way.

## What Changes

- Expand record APIs to support detail retrieval by id.
- Add partial update support for record title and status.
- Add delete support for records.
- Add list query options for pagination and status filtering.
- Standardize error responses for not found and invalid input cases.
- Update frontend data access to use the expanded API contract where relevant.

## Capabilities

### New Capabilities
- `records-management-api`: Full CRUD and query behavior for record resources, including list, detail, create, update, and delete operations.

### Modified Capabilities
- None.

## Impact

- Backend routes in app/api/routes/records.py.
- Backend schemas in app/schemas/record.py.
- Repository methods in app/repositories/record_repository.py.
- Potential tests under backend/tests for new API behaviors.
- Frontend API usage patterns for records in frontend/src/App.tsx.
