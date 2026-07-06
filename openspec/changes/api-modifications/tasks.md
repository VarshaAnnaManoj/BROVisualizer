## 1. Schema and Validation Updates

- [ ] 1.1 Add status enum or constrained validation for record status values in backend schemas.
- [ ] 1.2 Add RecordUpdate schema with optional title and status fields for patch semantics.
- [ ] 1.3 Add validation rule that rejects empty update payloads.

## 2. Repository Enhancements

- [ ] 2.1 Extend list_records to support optional status filter, limit, and offset.
- [ ] 2.2 Add repository method to fetch a single record by id.
- [ ] 2.3 Add repository method to apply partial updates to a record.
- [ ] 2.4 Add repository method to delete a record by id.

## 3. API Route Implementation

- [ ] 3.1 Update GET /api/v1/records to accept and apply filter/pagination query parameters.
- [ ] 3.2 Add GET /api/v1/records/{record_id} route with 404 behavior for missing records.
- [ ] 3.3 Add PATCH /api/v1/records/{record_id} route with partial update behavior and 404 handling.
- [ ] 3.4 Add DELETE /api/v1/records/{record_id} route with success and not found responses.

## 4. Test Coverage

- [ ] 4.1 Add tests for list endpoint default ordering and query parameter behaviors.
- [ ] 4.2 Add tests for detail endpoint success and not found cases.
- [ ] 4.3 Add tests for patch endpoint success, empty payload rejection, and missing record handling.
- [ ] 4.4 Add tests for delete endpoint success and missing record handling.
- [ ] 4.5 Add tests for invalid status validation on create and update payloads.

## 5. Frontend Integration Follow-up

- [ ] 5.1 Update frontend record fetch logic to consume new list query parameters when needed.
- [ ] 5.2 Add frontend actions for update and delete workflows once APIs are available.
- [ ] 5.3 Verify end-to-end behavior by creating, updating, deleting, and reloading records from UI.
