## ADDED Requirements

### Requirement: Record list supports filtering and pagination
The system SHALL return records ordered by newest first and SHALL support optional status filtering and offset-based pagination on the list endpoint.

#### Scenario: List records without query options
- **WHEN** a client calls GET /api/v1/records without query parameters
- **THEN** the system returns a 200 response containing records ordered by descending id

#### Scenario: Filter records by status
- **WHEN** a client calls GET /api/v1/records with a valid status query value
- **THEN** the system returns a 200 response containing only records with that status

#### Scenario: Paginate records with limit and offset
- **WHEN** a client calls GET /api/v1/records with limit and offset values
- **THEN** the system returns a 200 response containing the selected page of records

### Requirement: Record detail can be retrieved by id
The system SHALL provide an endpoint to retrieve a single record by id.

#### Scenario: Retrieve existing record
- **WHEN** a client calls GET /api/v1/records/{record_id} for an existing id
- **THEN** the system returns a 200 response with the matching record payload

#### Scenario: Retrieve missing record
- **WHEN** a client calls GET /api/v1/records/{record_id} for a non-existent id
- **THEN** the system returns a 404 response with a not found error message

### Requirement: Record can be partially updated
The system SHALL support partial updates to record title and status using patch semantics.

#### Scenario: Update title only
- **WHEN** a client calls PATCH /api/v1/records/{record_id} with a new title and no status
- **THEN** the system returns a 200 response with the updated title and unchanged status

#### Scenario: Update status only
- **WHEN** a client calls PATCH /api/v1/records/{record_id} with a new status and no title
- **THEN** the system returns a 200 response with the updated status and unchanged title

#### Scenario: Update missing record
- **WHEN** a client calls PATCH /api/v1/records/{record_id} for a non-existent id
- **THEN** the system returns a 404 response with a not found error message

### Requirement: Record can be deleted
The system SHALL allow deleting a record by id.

#### Scenario: Delete existing record
- **WHEN** a client calls DELETE /api/v1/records/{record_id} for an existing id
- **THEN** the system returns a success response and the record is no longer returned by list or detail endpoints

#### Scenario: Delete missing record
- **WHEN** a client calls DELETE /api/v1/records/{record_id} for a non-existent id
- **THEN** the system returns a 404 response with a not found error message

### Requirement: Invalid request payloads are rejected
The system SHALL validate create and update payloads and reject invalid field types or invalid status values.

#### Scenario: Reject invalid status on create
- **WHEN** a client calls POST /api/v1/records with a status outside allowed values
- **THEN** the system returns a 422 validation error response

#### Scenario: Reject empty patch payload
- **WHEN** a client calls PATCH /api/v1/records/{record_id} without title or status fields
- **THEN** the system returns a 422 validation error response
