## Why

The Modified Ontology list currently uses long text-style buttons for each difference, which creates visual clutter and slows scanning when many entries exist. A compact numbered bubble treatment will improve readability and let users navigate differences faster.

## What Changes

- Replace current text-heavy difference action buttons in the Modified Ontology list with compact numbered bubble buttons (1, 2, 3, ...).
- Preserve existing click behavior, keyboard accessibility, and target navigation for each difference item.
- Keep each bubble associated with a readable summary/label so users can still understand what each index represents.
- Ensure bubble styling remains consistent across desktop and responsive layouts.

## Capabilities

### New Capabilities
- `modified-ontology-numbered-bubble-actions`: Render difference actions in Modified Ontology as ordered numbered bubble buttons while preserving navigation behavior and accessibility.

### Modified Capabilities
- None.

## Impact

- Frontend compare UI rendering in Modified Ontology list, likely in App-level difference action rendering and related style modules.
- Frontend CSS for button shape, spacing, active/focus/hover states, and responsive behavior.
- Frontend tests that validate difference action rendering and interaction semantics.
