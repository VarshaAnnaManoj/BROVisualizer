## Why

The application currently has no access gate, so any user can open the visualizer directly. A simple login page is needed now to enforce basic entry control for internal/demo usage.

## What Changes

- Add a frontend login page that requires user ID and password before entering the app.
- Validate credentials against fixed values for this phase:
  - user ID: `user`
  - password: `Fifa2026$`
- Block access to the main visualizer route until authentication succeeds.
- Add clear error messaging for invalid credentials and a logout path to return to login.

## Capabilities

### New Capabilities
- `frontend-login-gate`: Provide a login experience and route guard that allows access only for valid credentials.

### Modified Capabilities
- None.

## Impact

- Frontend routing and app shell initialization.
- Frontend auth state management (session/local state).
- New login UI component and related styles.
- No backend API contract changes required for this phase.
