## Why

Current JSON diff behavior can produce noisy output by reporting many child-level differences even when an entire parent section is absent. For ontology/taxonomy trees, this obscures the true change and reduces usefulness for users who need concise hierarchical insights.

## What Changes

- Introduce parent-first hierarchical comparison for ontology JSON structures.
- Enforce traversal short-circuiting: when a parent node is missing, report that parent as missing and stop child comparison under that branch.
- Add explicit missing-section handling for metadata, explicit_skills, and implicit_skills arrays.
- Add structured output categories for missing Domain Category, missing Service Category, and missing section-level arrays.
- **BREAKING** Reduce child-level diff emission in cases where parent-level absence is detected, replacing noisy child reports with parent-level findings.

## Capabilities

### New Capabilities
- `parent-first-hierarchical-json-comparison`: Compare ontology JSON in hierarchy order (Domain Category -> Service Category -> section -> item) and stop descending when parent is missing.
- `section-level-missing-node-reporting`: Report missing metadata or skill arrays as entire missing sections without enumerating children.
- `ontology-diff-noise-suppression`: Suppress child-level diffs when parent absence is already reported for that branch.

### Modified Capabilities
- None.

## Impact

- Backend comparison/diff engine logic for ontology JSON traversal.
- Output formatting/aggregation for missing-node and changed-node reporting.
- Tests covering domain-level, service-level, section-level, and item-level comparison scenarios.
- Potential downstream consumers of diff output due to reduced child-level findings in parent-missing cases.
