## 1. Login UI and Auth State

- [x] 1.1 Create login page with user ID and password fields and submit button.
- [x] 1.2 Implement credential validation against configured values (`user` / `Fifa2026$`).
- [x] 1.3 Add invalid-credentials feedback and form-level validation UX.

## 2. Route Protection and Session Handling

- [x] 2.1 Add protected-route guard to block unauthenticated access to visualizer routes.
- [x] 2.2 Persist authenticated session state for the current browser session.
- [x] 2.3 Add logout action that clears auth state and redirects to login.

## 3. Verification

- [x] 3.1 Add/update frontend tests for successful login, failed login, and route redirection.
- [x] 3.2 Manually verify page refresh behavior for authenticated and unauthenticated states.
- [x] 3.3 Validate login UX on desktop and mobile viewport sizes.
