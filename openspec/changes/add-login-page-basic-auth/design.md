## Context

The current frontend launches directly into the ontology visualizer. For immediate access control, a lightweight login gate with static credentials is required. This is intentionally a short-term mechanism suitable for controlled internal use, not a full identity solution.

## Goals / Non-Goals

**Goals:**
- Add a login page with user ID and password inputs.
- Allow entry only for credentials `user` / `Fifa2026$`.
- Prevent unauthenticated access to protected app routes.
- Preserve login state for current browser session.
- Provide logout to clear auth state and return to login.

**Non-Goals:**
- No backend authentication API.
- No password reset, account management, or multi-user support.
- No production-grade security hardening beyond basic client-side gate.

## Decisions

- Implement auth gate on frontend with route-level protection.
  - Rationale: quickest delivery without backend changes.
  - Alternative considered: backend auth endpoint; deferred for future phase.
- Store authenticated flag in session storage (or equivalent in-memory with refresh fallback).
  - Rationale: keeps login active during session while minimizing persistence scope.
  - Alternative considered: local storage; rejected to avoid long-lived auth state.
- Keep static credential constants in a dedicated config module.
  - Rationale: avoids scattering literals and simplifies future backend replacement.

## Risks / Trade-offs

- [Risk] Client-side static credential is not secure for production -> Mitigation: mark as temporary and plan migration to server-side auth.
- [Risk] Users may bypass simple frontend checks via dev tools -> Mitigation: document internal-use-only limitation.
- [Risk] Route-guard regressions may block navigation unexpectedly -> Mitigation: add focused tests for authenticated/unauthenticated routes.

## Migration Plan

- Add login route/page and guard protected routes.
- Wire auth state provider/utility and logout control.
- Deploy with clear note that this is temporary demo/internal authentication.
- Rollback by disabling guard and defaulting to current direct app entry.

## Open Questions

- Should session timeout be enforced for inactivity in this phase?
- Should failed login attempts trigger temporary cooldown?
