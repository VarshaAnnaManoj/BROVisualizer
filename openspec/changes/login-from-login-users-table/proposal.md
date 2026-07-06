## Why

The current login approach relies on hardcoded credentials and cannot be managed through data. Selecting user_id and password from the login_users table enables credential updates without code changes and aligns login behavior with database-backed access control.

## What Changes

- Replace hardcoded frontend-only credential validation with backend login validation against login_users table values.
- Add backend authentication endpoint that looks up user_id and password from login_users for login verification.
- Update frontend login flow to call the backend login API and handle success/failure states.
- Maintain protected-route behavior so only authenticated users can access the visualizer.
- Add error handling for invalid credentials and backend connectivity issues.

## Capabilities

### New Capabilities
- `database-backed-login-validation`: Authenticate users by selecting user_id and password from login_users table.

### Modified Capabilities
- `frontend-login-gate`: Change login validation requirement from static credentials to backend API validation.

## Impact

- Backend API routes/services/repositories for authentication.
- Database access layer for login_users table queries.
- Frontend login page and auth state flow.
- Test coverage for backend login endpoint and frontend login integration behavior.
