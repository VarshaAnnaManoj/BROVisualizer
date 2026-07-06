## Why

The current comparison screen spends space on the Transformation Summary panel while key comparison work happens in the Pre, Post, and Modified panes. Users need that space reallocated to Modified Ontology and want Pre/Post panes positioned lower so content is easier to follow instead of appearing visually mid-aligned.

## What Changes

- Remove the Transformation Summary panel from comparison mode layout.
- Expand Modified Ontology pane to use the freed summary-panel area.
- Reflow comparison layout so Pre and Post panes sit lower with improved vertical alignment and visual continuity.
- Keep diff actions and highlight behavior intact while adjusting pane sizing and placement.

## Capabilities

### New Capabilities
- `comparison-layout-without-summary-panel`: Remove summary panel and reallocate comparison space to core panes.
- `lower-aligned-pre-post-panels`: Position Pre/Post panes lower and maintain consistent scroll/viewport behavior.

### Modified Capabilities
- None.

## Impact

- Frontend layout structure and conditional rendering in frontend/src/App.tsx.
- Comparison-grid sizing/alignment styles in frontend/src/App.css.
- Frontend tests in frontend/src/App.test.tsx for layout and interaction regression checks.
- No backend, API, or database impact.
