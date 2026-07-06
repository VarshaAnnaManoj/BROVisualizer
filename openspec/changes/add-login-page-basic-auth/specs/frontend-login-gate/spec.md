## ADDED Requirements

### Requirement: Login Credential Validation
The system SHALL present a login page that requires user ID and password and SHALL grant access only when credentials match the configured values.

#### Scenario: Successful login
- **WHEN** a user submits user ID `user` and password `Fifa2026$`
- **THEN** the system authenticates the user and navigates to the main visualizer page

#### Scenario: Failed login
- **WHEN** a user submits credentials that do not match the configured values
- **THEN** the system keeps the user on the login page
- **AND** displays an invalid-credentials message

### Requirement: Protected Route Access
The system SHALL block access to protected visualizer routes for unauthenticated users.

#### Scenario: Unauthenticated user opens protected route
- **WHEN** an unauthenticated user navigates directly to a protected app URL
- **THEN** the system redirects the user to the login page

### Requirement: Logout Behavior
The system SHALL provide logout that clears authentication state.

#### Scenario: User logs out
- **WHEN** an authenticated user activates logout
- **THEN** the system clears authentication state
- **AND** redirects the user to the login page
