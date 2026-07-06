## 1. Backend Authentication API

- [x] 1.1 Add auth request/response schemas for login with user_id and password input.
- [x] 1.2 Implement repository query to select user_id and password from login_users by user_id.
- [x] 1.3 Implement auth service logic to validate submitted password against login_users data and return success/failure.
- [x] 1.4 Add POST login endpoint under backend API routes and wire dependency injection.
- [x] 1.5 Add backend tests for valid login, invalid login, missing fields, and DB error handling.

## 2. Frontend Login Integration

- [x] 2.1 Replace static credential check with backend login API call in login page submit flow.
- [x] 2.2 Keep protected-route behavior and session-auth state updates on login success.
- [x] 2.3 Add user-facing messages for invalid credentials and backend-unavailable errors.
- [x] 2.4 Ensure logout clears auth state and returns to login page.

## 3. Verification and Hardening

- [x] 3.1 Add/update frontend tests for API-backed successful and failed login flows.
- [x] 3.2 Run backend and frontend test suites and fix regressions.
- [x] 3.3 Document temporary security limitations if plaintext password comparison is used.
