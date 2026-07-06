## Context

The app currently uses a simple login gate with static credentials in frontend logic. The requested behavior is to authenticate by selecting user_id and password from the login_users table, which requires backend validation and frontend integration with an auth API endpoint.

## Goals / Non-Goals

**Goals:**
- Validate login credentials against login_users table data.
- Expose a backend login endpoint that returns authenticated/unauthenticated result.
- Update frontend login flow to use backend authentication instead of hardcoded values.
- Keep route protection and logout behavior intact after authentication source change.

**Non-Goals:**
- Full token-based identity platform or third-party SSO integration.
- User registration, password reset, or account lifecycle flows.
- Authorization roles/permissions beyond basic authenticated access.

## Decisions

- Implement a dedicated backend endpoint such as POST /api/auth/login that accepts user_id and password.
  - Rationale: centralizes authentication logic server-side and decouples frontend from credential storage.
  - Alternative considered: direct frontend DB access; rejected due to security and architecture boundaries.
- Query login_users through repository layer with parameterized SQLAlchemy query for user_id lookup.
  - Rationale: aligns with current backend architecture and avoids SQL injection risks.
  - Alternative considered: raw SQL string concatenation; rejected due to security risk.
- Compare password from request to stored password from table according to current data format.
  - Rationale: supports current requirement quickly; if table stores hashed values, use hash verification utility.
- Return minimal response payload (success flag and optional message) and do not return password or sensitive fields.
  - Rationale: reduce data exposure.

## Risks / Trade-offs

- [Risk] Table stores plaintext passwords, creating security debt -> Mitigation: document migration path to hashed passwords and verification function.
- [Risk] Login endpoint brute-force attempts -> Mitigation: add rate limiting in later iteration and log failed attempts.
- [Risk] Backend DB outages block login -> Mitigation: show clear frontend error and retain existing health diagnostics.

## Migration Plan

- Add backend auth schema/model/repository/service/route for login_users credential check.
- Integrate frontend login submit with backend endpoint.
- Keep existing protected route pattern and replace only credential source.
- Verify rollback path by temporarily restoring static credential check if backend auth endpoint must be disabled.

## Open Questions

- Does login_users.password contain plaintext or hashed values in all environments?
- Should login be case-sensitive for user_id?
- Is there a requirement to support multiple simultaneous sessions per user?
