## Why

The current frontend implementation does not visually match the Figma design for node 5:7, which causes design drift and review friction. This change is needed now to align shipped UI with the approved design baseline before further feature work.

## What Changes

- Replace the current page composition and styling with a structure that mirrors the Figma node 5:7 layout.
- Update typography, spacing, color usage, and component sizing to match the target frame.
- Implement responsive behavior that preserves visual hierarchy across desktop, tablet, and mobile.
- Refine interactive states and accessibility behavior without changing backend integration boundaries.
- Keep component architecture reusable while improving visual fidelity.

## Capabilities

### New Capabilities
- `figma-node-5-7-visual-fidelity`: Defines and delivers UI behavior and styling rules required to match Figma node 5:7 across supported breakpoints.

### Modified Capabilities
- None.

## Impact

- Affects frontend page components, style tokens, and layout utility classes in the React app.
- Introduces stricter visual validation expectations in implementation workflow.
- No backend, API, or data-contract changes are introduced.
