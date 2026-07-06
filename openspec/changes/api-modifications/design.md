## Context

The backend currently supports only list and create operations for records through /api/v1/records. Frontend behavior and future integrations require full lifecycle APIs so records can be retrieved individually, updated, and deleted without ad hoc database manipulation. The change touches API routes, schemas, repository logic, and test coverage in one service.

## Goals / Non-Goals

**Goals:**
- Provide complete CRUD behavior for records through versioned REST endpoints.
- Support query parameters on list operations for status filtering and pagination.
- Keep response contracts consistent with existing RecordRead output format.
- Ensure missing-record cases return a deterministic 404 error response.

**Non-Goals:**
- Introduce authentication or authorization controls.
- Redesign the records data model beyond fields needed by current API.
- Add bulk create, bulk update, or bulk delete operations.
- Introduce a new API version.

## Decisions

1. Add item-level endpoints under existing records route namespace.
- Decision: Add GET /api/v1/records/{record_id}, PATCH /api/v1/records/{record_id}, and DELETE /api/v1/records/{record_id}.
- Rationale: Preserves current route organization and avoids unnecessary version churn.
- Alternative considered: Create a separate route group for mutation endpoints; rejected because it fragments resource ownership.

2. Extend list endpoint with query parameters.
- Decision: Add optional status, limit, and offset parameters to GET /api/v1/records.
- Rationale: Enables incremental UI pagination and basic filtering while retaining backward compatibility when omitted.
- Alternative considered: New dedicated search endpoint; rejected due to unnecessary complexity for current scope.

3. Introduce focused schemas for partial updates.
- Decision: Add RecordUpdate schema with optional title and status fields.
- Rationale: Keeps create and update validation rules separate and explicit.
- Alternative considered: Reuse RecordCreate for patch requests; rejected because patch semantics require optional fields.

4. Keep repository as single DB interaction layer.
- Decision: Add get_record_by_id, update_record, and delete_record methods in repository.
- Rationale: Preserves architectural separation where routes remain thin and DB logic is centralized.
- Alternative considered: Direct DB session operations inside route handlers; rejected for maintainability.

## Risks / Trade-offs

- [Risk] Invalid status values could reach storage if validation is too loose -> Mitigation: Validate status in schema with constrained allowed values.
- [Risk] Pagination defaults may hide records unexpectedly for current consumers -> Mitigation: Use conservative default limit and document behavior in API spec.
- [Trade-off] Additional endpoints increase test surface area -> Mitigation: Add focused API tests for happy and error paths only in this change.

## Migration Plan

- Implement schemas, repository updates, and route handlers behind existing /api/v1 prefix.
- Deploy with no data migration required because table structure remains compatible.
- Rollback by reverting route/repository/schema changes; existing list/create behavior remains intact.

## Open Questions

- Should status values be strictly enumerated as active, pending, archived at API boundary?
- Do we need soft delete semantics in future instead of hard delete?
