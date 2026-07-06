## Context

The current Modified Ontology diff view is informative but passive: users can identify paths that changed yet must manually scan Pre and Post JSON panes to locate the exact source context. This slows analysis, especially with large nested payloads and repeated compare cycles. The requested enhancement is interaction-focused: render each diff row as a button and make selection navigate to the corresponding source pane and path.

The current frontend already computes deterministic diff entries and renders Pre/Post JSON viewers side-by-side. This design extends existing behavior by adding source-aware metadata to each diff entry, unified diff window presentation for `PRE ONLY` and `POST ONLY`, and in-viewer navigation/focus behavior without backend changes.

## Goals / Non-Goals

**Goals:**
- Render each Modified Ontology diff entry as an interactive button.
- Show `PRE ONLY` and `POST ONLY` entries in one combined diff window while preserving clear source labels.
- Navigate to and highlight the corresponding path in Pre or Post JSON viewer when a diff button is clicked.
- Ensure navigation behavior works for both presence-only and changed-value entries.
- Keep behavior deterministic and keyboard-accessible.

**Non-Goals:**
- No backend API or schema changes.
- No semantic ontology reasoning beyond existing path-level diff computation.
- No automatic cross-pane synchronized scrolling beyond targeted jump/focus.

## Decisions

1. Decision: Attach source-target metadata to each rendered diff button (`sourcePane`, `path`, `entryType`).
- Rationale: Button click handling becomes explicit and testable without parsing display text.
- Alternative considered: infer source from CSS class or section. Rejected because it is fragile and harder to maintain.

2. Decision: Use a single merged list container for `PRE ONLY` and `POST ONLY` entries with category chips.
- Rationale: Matches request for same-window visibility while keeping origin clear.
- Alternative considered: maintain separate sections. Rejected due to extra scanning and context switching.

3. Decision: Implement source jump by assigning stable DOM anchors per path in Pre/Post viewers and calling `scrollIntoView` on click.
- Rationale: Works with existing rendering, avoids introducing virtualization complexity.
- Alternative considered: custom synchronized virtual list. Rejected as over-engineered for current scope.

4. Decision: Keep changed values as paired actionable buttons (Pre target and Post target).
- Rationale: Preserves existing diff semantics and supports direct before/after trace.
- Alternative considered: single changed button that toggles target. Rejected because target destination becomes ambiguous.

5. Decision: Add active navigation state to visually confirm current target pane/path.
- Rationale: Reduces user disorientation after jumps and improves repeated review flow.
- Alternative considered: no active state, rely on scroll position only. Rejected for poor usability in dense views.

## Risks / Trade-offs

- [Risk] Path-to-anchor mapping may fail for deeply nested or special-character paths. -> Mitigation: normalize anchor keys and add tests for nested paths/arrays.
- [Risk] Frequent re-renders may reset scroll or active highlights. -> Mitigation: memoize diff entries and preserve selected target state across harmless rerenders.
- [Risk] Combined list can become long and noisy. -> Mitigation: keep strong type labels/chips and optional filtering hooks for future enhancement.
- [Risk] Button-only interactions may reduce readability if overstyled. -> Mitigation: retain monospace path text and compact visual hierarchy.

## Migration Plan

1. Extend diff entry model with source-target metadata.
2. Refactor Modified pane renderer to use interactive button entries in a merged container.
3. Add source viewer anchors and click handler for jump/focus behavior.
4. Add active target highlighting in diff list and source viewer.
5. Add/update tests for source routing and navigation correctness.
6. Validate frontend tests and build.

Rollback strategy: revert to non-interactive diff entry rendering while keeping existing diff classification behavior.

## Open Questions

- Should navigation auto-expand collapsed JSON branches if collapsible viewers are introduced later?
- Should repeated clicks center the target line or preserve current scroll if already visible?
- Do we want optional filters (Pre-only / Post-only / Changed) in the first iteration or defer?
