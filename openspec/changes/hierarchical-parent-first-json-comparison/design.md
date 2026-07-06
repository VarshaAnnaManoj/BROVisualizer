## Context

The ontology JSON model is hierarchical: Domain Category -> Service Category -> section arrays (metadata, explicit_skills, implicit_skills) -> individual items. Existing comparison logic risks over-reporting by emitting many child-level differences when an ancestor node is absent, resulting in noisy and less actionable output.

## Goals / Non-Goals

**Goals:**
- Implement parent-first recursive comparison with strict short-circuit behavior.
- Enforce hierarchy-priority evaluation: Domain Category, then Service Category, then section arrays, then individual items.
- Report whole-node absence at the highest missing level and suppress child findings beneath that missing parent.
- Keep child-level comparisons only when both parent nodes exist.

**Non-Goals:**
- No changes to ontology schema fields themselves.
- No UI redesign beyond consuming cleaner diff output.
- No new third-party dependencies.

## Decisions

1. Parent-first recursion with traversal cutoff.
- Decision: Every recursive step first checks parent node existence in both JSONs before descending.
- Rationale: Prevents noisy child reports when parent absence already explains the difference.
- Alternative considered: full-depth flatten-and-diff. Rejected because it cannot naturally express parent-priority suppression.

2. Hierarchical difference classification.
- Decision: Emit typed missing-node outcomes by hierarchy level: missing_domain_category, missing_service_category, missing_section, then item-level deltas.
- Rationale: Preserves clear semantics and supports structured downstream display.
- Alternative considered: single generic missing-node type. Rejected due to weaker explainability.

3. Section-level array suppression rules.
- Decision: If metadata, explicit_skills, or implicit_skills array is missing on one side, emit one section-missing event and skip item-level comparison for that section.
- Rationale: Matches user expectation for concise section-level reporting.
- Alternative considered: emit section missing plus child-level entries. Rejected as redundant/noisy.

## Risks / Trade-offs

- [Risk] Mixed keyed/non-keyed arrays may cause ambiguous item matching. -> Mitigation: define deterministic item matching strategy and test both keyed and index-based cases.
- [Risk] Existing consumers may expect old child-heavy diff output. -> Mitigation: flag this as a breaking output behavior change and update consumer tests.
- [Trade-off] Less granular output in parent-missing scenarios. -> Mitigation: this is intentional and aligned with hierarchy-first readability goals.

## Migration Plan

- Implement recursive comparator updates in JSON comparison engine.
- Add exhaustive tests for domain-missing, service-missing, section-missing, and normal child-comparison paths.
- Validate output contracts for downstream consumers.
- Rollback by reverting comparator/output changes if unexpected integrations fail.

## Open Questions

- Should missing-section output include parent path context always, or only section name when parent path is obvious from grouped output?
- For metadata object comparison, should matching key be metadata_name only or metadata_name plus index fallback when duplicates exist?
