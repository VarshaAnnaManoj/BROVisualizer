## Context

The current comparison mode renders three panes where Pre, Post, and Modified are treated as independent data-loading sections. Users must visually inspect large JSON payloads manually, which is slow and error-prone for nested ontology structures. The requested behavior is to make the third pane a computed diff between Pre and Post with explicit color semantics: yellow for data present in Pre but absent in Post, and green for data present in Post but absent in Pre.

The frontend already retrieves Pre and Post records via existing ontology endpoints and supports independent section-level state. This design should preserve the backend contract and introduce a deterministic, frontend-side diff engine that scales to nested objects and arrays.

## Goals / Non-Goals

**Goals:**
- Compute a deterministic JSON diff result from the currently loaded Pre and Post ontology JSON payloads.
- Render the third pane as a derived comparison view with clear yellow/green highlighting semantics.
- Keep Pre and Post request flows independent and unchanged from the existing endpoint pattern.
- Support nested JSON structures with stable output ordering for readability and testability.
- Preserve responsive usability on desktop and mobile layouts.

**Non-Goals:**
- No backend endpoint additions, schema updates, or persisted diff storage.
- No full semantic ontology reasoning beyond structural/value comparison.
- No change-history timeline or multi-version diff matrix in this change.

## Decisions

1. Decision: Convert the third pane into a derived Pre-vs-Post diff pane instead of independently fetched data.
- Rationale: The user intent is direct comparison; deriving from loaded Pre/Post data eliminates inconsistent state and redundant API calls.
- Alternative considered: Keep third pane as independent fetch and add optional compare mode. Rejected because it complicates UX and weakens clarity.

2. Decision: Use path-based normalization and flattening for core diff computation.
- Rationale: Flattened path maps (for example, `root.a.b[0].c`) make added/removed/changed classification deterministic and easy to unit test.
- Alternative considered: Text diff of pretty-printed JSON. Rejected due to noisy output and poor structural fidelity.

3. Decision: Represent changed values as paired removal/addition entries using existing two-color language.
- Rationale: Preserves requested yellow/green scheme while still communicating before/after value transitions.
- Alternative considered: Introduce a third color for changed values. Rejected to keep color semantics simple and aligned with request.

4. Decision: Apply hybrid array comparison with keyed matching fallback.
- Rationale: Compare array elements by `id` when available for semantic stability; otherwise compare by index for deterministic fallback.
- Alternative considered: Index-only comparison. Rejected because reordering in id-based arrays would produce excessive false positives.

5. Decision: Keep diff rendering grouped by Added, Removed, and Changed sections with optional count badges.
- Rationale: Grouping improves scanability for large payloads and provides immediate summary context.
- Alternative considered: Single linear list. Rejected because mixed change types become harder to interpret quickly.

## Risks / Trade-offs

- [Risk] Deeply nested or large JSON payloads may impact client-side diff performance. -> Mitigation: compute diff only when Pre/Post payloads change and avoid unnecessary recomputation.
- [Risk] Hybrid array matching can still produce edge-case mismatches for arrays without stable identifiers. -> Mitigation: document fallback behavior and include focused tests for array scenarios.
- [Risk] Color-only differentiation can reduce accessibility for some users. -> Mitigation: include textual badges/icons (Added/Removed/Changed) alongside color highlighting.
- [Risk] Derived third pane may be perceived as less configurable than independent loading. -> Mitigation: clarify pane label and helper text that it is computed from current Pre/Post selections.

## Migration Plan

1. Update comparison state model so Modified pane data is computed, not fetched.
2. Introduce diff transformation utility and stable sorting of output entries.
3. Replace third-pane renderer with grouped highlighted diff sections.
4. Add test coverage for key presence, value changes, array handling, and visual grouping.
5. Validate with frontend test and build.

Rollback strategy: revert to the previous three-independent-pane behavior; no data migration is required because this change is presentation and computation only.

## Open Questions

- Should unchanged keys be hidden by default or available through a toggle?
- Should users be able to export the computed diff JSON for downstream workflows?
- Which exact identifier fields besides `id` (for example `uuid`, `code`) should be included in keyed array matching?
