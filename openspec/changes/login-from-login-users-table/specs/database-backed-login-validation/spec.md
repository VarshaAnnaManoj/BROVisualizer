## ADDED Requirements

### Requirement: Login Users Table Authentication
The system SHALL authenticate login attempts by selecting user_id and password from the login_users table.

#### Scenario: Valid credentials found in login_users
- **WHEN** a user submits a login request with a user_id and password that match a row in login_users
- **THEN** the system returns a successful authentication response
- **AND** the response SHALL NOT include password data

#### Scenario: Invalid credentials not found in login_users
- **WHEN** a user submits a login request where user_id does not exist or password does not match login_users
- **THEN** the system returns an authentication failure response
- **AND** the system SHALL NOT create an authenticated session

### Requirement: Backend Auth Endpoint Contract
The system SHALL expose a backend API endpoint for login validation using database-backed credentials.

#### Scenario: Login request payload validation
- **WHEN** the client sends a login request missing user_id or password
- **THEN** the system returns a validation error response

#### Scenario: Database error during login check
- **WHEN** the login_users lookup fails due to database connectivity or query errors
- **THEN** the system returns a server error response without leaking sensitive internals
