## Context

The frontend already renders a three-section comparison view for Pre, Post, and Modified Ontology, but users still need stronger consistency in section behavior and clearer interaction states when editing and loading each section. The requested change focuses on refining section workflow consistency, section-level isolation, and responsive readability without changing backend APIs.

This is a frontend-only evolution and should preserve current backend contract usage (`id` + `version` retrieval) while reducing user confusion during repeated comparisons.

## Goals / Non-Goals

**Goals:**
- Standardize Pre/Post/Modified interaction behavior for edit, submit, retry, validation, and error display.
- Keep section state fully isolated so operations in one section never reset or overwrite another section.
- Improve layout/readability for three-section comparison on desktop and mobile.
- Maintain compatibility with existing ontology retrieval endpoints and current data contracts.

**Non-Goals:**
- No backend endpoint additions or schema changes.
- No automatic semantic diff generation between sections.
- No overhaul of the entire dashboard visual design beyond comparison UX refinements.

## Decisions

1. Decision: Use a shared section state model keyed by section identifier (`pre`, `post`, `modified`).
- Rationale: Enforces uniform behavior and reduces duplicated logic.
- Alternative considered: Keep separate state hooks per section. Rejected due to drift risk and harder maintenance.

2. Decision: Keep section actions section-scoped (validation, loading, retry, error).
- Rationale: Prevents cross-section regressions and supports mixed success/failure workflows.
- Alternative considered: Single global submit and validation state. Rejected because it blocks independent analysis.

3. Decision: Reuse existing endpoint contract for all sections.
- Rationale: Avoids backend churn and keeps implementation focused on frontend UX.
- Alternative considered: Section-specific endpoints. Rejected as unnecessary duplication.

4. Decision: Improve responsive layout with explicit three-panel behavior.
- Rationale: Maintains readability as the comparison surface grows.
- Alternative considered: Keep prior two-column assumptions. Rejected due to crowding and poor mobile behavior.

## Risks / Trade-offs

- [Risk] Refactoring shared section logic may introduce regressions in existing Pre/Post behavior. -> Mitigation: keep tests for existing sections and add section-parity tests.
- [Risk] Three-panel UI can become visually dense on smaller screens. -> Mitigation: stack panels at smaller breakpoints and keep concise controls.
- [Risk] Repeated polling/reload behavior could trigger unnecessary requests. -> Mitigation: scope fetch triggers to section selection changes and explicit retries.

## Migration Plan

1. Update comparison state model to guarantee parity across Pre/Post/Modified.
2. Apply section-isolated handlers for input, submit, validation, loading, and retry.
3. Adjust three-panel layout and responsive breakpoints.
4. Extend tests to cover parity and isolation for all three sections.
5. Validate with frontend test and build pipelines.

Rollback strategy: revert frontend state/layout changes; no backend rollback required.

## Open Questions

- Should section headers include additional contextual hints (for example, source role guidance) to reduce operator error?
- Should per-section metadata visibility be configurable in the comparison view?
- Is there a future need for optional fourth section support that should influence current abstraction depth?