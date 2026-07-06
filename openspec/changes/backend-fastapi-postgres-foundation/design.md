## Context

The project has frontend implementation completed but lacks backend API and persistence services. This change introduces a FastAPI backend with PostgreSQL connectivity so frontend integration can progress against stable backend contracts. Database access must be configured securely via environment variables, with no hardcoded secrets in source code.

## Goals / Non-Goals

**Goals:**
- Establish a maintainable FastAPI backend project structure.
- Integrate PostgreSQL connection handling through `DATABASE_URL` environment configuration.
- Add baseline health/readiness endpoints for operational checks.
- Introduce initial persistence scaffolding for future feature endpoints.

**Non-Goals:**
- Implement full business domain APIs.
- Add authentication/authorization in this first backend foundation step.
- Introduce production deployment infrastructure beyond local/dev baseline.

## Decisions

- Use FastAPI for typed request/response contracts and ecosystem alignment.
- Use environment variable based configuration to keep secrets out of source control.
- Use a dedicated database session dependency pattern for request-scoped database access.
- Keep controllers, schemas, and repository/data layer separated for future scalability.

## Risks / Trade-offs

- [Invalid `DATABASE_URL` format or credentials] -> Mitigation: add startup/health diagnostics with explicit connection failure messaging.
- [Connection leaks under request load] -> Mitigation: enforce managed session lifecycle in dependency injection.
- [Schema drift as APIs evolve] -> Mitigation: establish migration-ready structure from the outset.

## Migration Plan

1. Create backend module layout and FastAPI app entrypoint.
2. Add environment configuration loader and PostgreSQL connection utilities.
3. Add health/readiness endpoints with DB check.
4. Add baseline persistence layer scaffolding and verify lint/run checks.
5. Document local setup instructions including `DATABASE_URL` usage.

## Open Questions

- Which ORM/migration stack should be the long-term standard (SQLAlchemy + Alembic, SQLModel, or alternative)?
- What are the first domain resources required by the frontend integration phase?
