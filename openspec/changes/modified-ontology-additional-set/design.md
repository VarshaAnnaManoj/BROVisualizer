## Context

The current frontend comparison experience supports two independently loaded ontology sets (Pre and Post), each identified by ontology id and version. Users now need to evaluate an additional reference set in the same session, labeled Modified Ontology, without losing the existing two-pane behavior.

The backend already supports ontology and metadata retrieval using id and optional version query parameters. This change focuses on extending the UI interaction model and client-side state orchestration to support a third independently controlled set while preserving existing fetch contracts and failure handling behavior.

Constraints:
- Keep existing Pre/Post behavior and endpoint contracts unchanged.
- Keep pane-level isolation so one failure does not block others.
- Preserve responsiveness and readability for larger JSON payloads.

## Goals / Non-Goals

**Goals:**
- Add an additional Modified Ontology input and result section in the comparison flow.
- Support independent id/version validation, loading, success, and error states for Modified Ontology.
- Render Modified Ontology JSON alongside existing Pre/Post JSON views.
- Preserve existing Pre/Post comparison behavior and tests.

**Non-Goals:**
- No backend schema changes or new API family.
- No auto-diff generation across the three sets.
- No redesign of existing ontology JSON rendering component patterns.

## Decisions

1. Decision: Extend existing comparison state model to include a third set keyed as `modified`.
- Rationale: Reuses proven pane-isolation patterns and reduces regression risk.
- Alternative considered: Introduce an array-driven dynamic pane registry immediately. Rejected for this change because it increases implementation scope and test migration complexity.

2. Decision: Reuse existing ontology/metadata endpoints for Modified Ontology requests.
- Rationale: Backend contract already supports id/version retrieval; avoids API surface expansion.
- Alternative considered: Create dedicated `/modified` endpoints. Rejected because it duplicates behavior and creates unnecessary maintenance burden.

3. Decision: Keep validation and request lifecycle fully independent per set.
- Rationale: Maintains user control and prevents one invalid or slow request from blocking other visible results.
- Alternative considered: Single submit and single validation gate for all three sets. Rejected due to poorer UX and increased coupling.

4. Decision: Keep layout explicit and labeled for three sets.
- Rationale: Clear section labels reduce context confusion during side-by-side checks.
- Alternative considered: Tabbed interface. Rejected because requirement emphasizes concurrent visibility.

## Risks / Trade-offs

- [Risk] Three parallel JSON panels may reduce readability on smaller screens. -> Mitigation: use responsive layout stacking and maintain clear section headers.
- [Risk] Additional state branch can introduce copy/paste logic drift. -> Mitigation: factor shared pane operations into helpers and extend test coverage.
- [Risk] Increased request volume when users load all sets concurrently. -> Mitigation: keep on-demand fetch behavior and avoid auto-refresh loops.

## Migration Plan

1. Extend frontend comparison state to include Modified Ontology fields and result state.
2. Add Modified Ontology input section and result panel with responsive layout updates.
3. Wire API calls using existing id/version endpoint patterns.
4. Add/update tests for three-set rendering, isolated validation, and mixed success/failure.
5. Verify existing Pre/Post behavior remains unchanged.

Rollback: revert frontend changes to the prior two-pane UI; backend remains unaffected.

## Open Questions

- Should Modified Ontology be optional in the compare flow, or required before a "compare" action is considered complete?
- Should metadata display for Modified Ontology always render with JSON or remain secondary/collapsible?
- Is there a desired visual ordering preference among Pre, Post, and Modified for analyst workflow?