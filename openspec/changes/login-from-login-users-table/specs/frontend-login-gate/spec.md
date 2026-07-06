## MODIFIED Requirements

### Requirement: Login Credential Validation
The system SHALL present a login page that requires user ID and password and SHALL grant access only when backend authentication confirms credentials from login_users table.

#### Scenario: Successful login
- **WHEN** a user submits user ID and password on the login page
- **THEN** the frontend calls the backend login API
- **AND** the system authenticates and navigates to the main visualizer page only when backend response indicates success

#### Scenario: Failed login
- **WHEN** a user submits credentials that backend login API rejects
- **THEN** the system keeps the user on the login page
- **AND** displays an invalid-credentials message

#### Scenario: Backend unavailable during login
- **WHEN** a user submits credentials and the backend login API is unreachable or returns server error
- **THEN** the system keeps the user on the login page
- **AND** displays a service-unavailable or retry message
