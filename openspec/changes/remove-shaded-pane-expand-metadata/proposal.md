## Why

The shaded Modified Ontology area currently consumes a large portion of screen real estate without adding actionable value in the desired layout. Reallocating that area to metadata improves information density and aligns the UI with the requested design.

## What Changes

- Remove the shaded Modified Ontology panel from the comparison row.
- Reuse the freed layout width/height to expand metadata presentation in the right-side area.
- Keep Pre and Post panes intact, including load controls, JSON display modes, and bubble navigation behavior.
- Keep Image and OCR Text sections visible while rebalancing right-side spacing for larger metadata cards/columns.
- Update tests to reflect the removal of the shaded panel and verify metadata occupies the reclaimed area.

## Capabilities

### New Capabilities
- metadata-space-reallocation: Remove the shaded Modified Ontology area and allocate that space to metadata columns while preserving existing comparison flows.

### Modified Capabilities
- None.

## Impact

- Frontend layout structure and CSS grid sizing in the dashboard main analysis area.
- Frontend rendering logic and tests that currently assert the presence of the Modified Ontology panel.
- No required backend API contract changes.
