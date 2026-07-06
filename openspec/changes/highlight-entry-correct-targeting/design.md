## Context

The comparison UI allows users to click entries in the Modified pane and highlight corresponding content in Pre or Post JSON viewers. Current behavior can highlight nearby or parent sections instead of the exact entry, especially for indexed paths and nested mixed structures. This mismatch reduces trust in the comparison workflow and slows validation.

The logic is concentrated in frontend/src/App.tsx where active paths are parsed and mapped to displayed JSON lines, with visual feedback in frontend/src/App.css and behavior coverage in frontend/src/App.test.tsx. No backend changes are needed.

## Goals / Non-Goals

**Goals:**
- Resolve Modified-path navigation to the exact source entry whenever a precise target exists.
- Preserve deterministic behavior across nested objects, arrays, and indexed entries.
- Provide explicit fallback behavior only when exact matching is impossible.
- Add regression tests that detect off-by-one and parent-block mis-highlighting.

**Non-Goals:**
- No redesign of the comparison page layout.
- No changes to backend APIs, payload shape, or diff generation contract.
- No introduction of new external dependencies.

## Decisions

1. Path-first targeting with index-aware resolution.
- Decision: Parse active path tokens into object keys and optional array indexes, then resolve highlight range from the rendered JSON lines using token sequence context.
- Rationale: Directly follows user intent and avoids broad section matches.
- Alternative considered: Key-only matching. Rejected because repeated keys and arrays cause ambiguous or wrong targets.

2. Deterministic fallback hierarchy.
- Decision: If exact indexed target cannot be located, fallback to nearest key-level entry and visually keep fallback styling consistent.
- Rationale: Avoids blank state while preventing unrelated highlight jumps.
- Alternative considered: No highlight on failure. Rejected because users lose navigation context.

3. Test scenarios for nested and repeated patterns.
- Decision: Add tests covering repeated keys in different branches, array index targeting, and fallback paths.
- Rationale: These are the known failure modes and easiest to regress.
- Alternative considered: Snapshot-only tests. Rejected due to low diagnostic value for path resolution bugs.

## Risks / Trade-offs

- [Risk] Path parsing complexity can increase edge-case bugs for uncommon structures. -> Mitigation: isolate helper functions and add targeted tests per structure pattern.
- [Risk] Render-time line scanning may be costly for very large JSON payloads. -> Mitigation: compute only for active pane/path and memoize parsed text where practical.
- [Trade-off] Fallback highlight can still be broader than ideal when exact element is absent. -> Mitigation: prefer minimal nearest scope and surface path context in the banner.

## Migration Plan

- Implement exact-target path resolution updates in frontend/src/App.tsx.
- Adjust highlight styles in frontend/src/App.css only if needed for fallback clarity.
- Add regression coverage in frontend/src/App.test.tsx.
- Validate with frontend test and build commands.
- Rollback by reverting these frontend files if regressions appear.

## Open Questions

- Should fallback states include a small indicator text such as approximate match when exact target is unavailable?
- Should exact-target failures be logged to console in development mode for faster debugging?
