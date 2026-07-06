## Why

The Modified Ontology panel currently shows detailed difference descriptions and section content that the user no longer needs, increasing noise and taking space. Moving to bubble-only actions directly below the Change Only controls creates a faster, cleaner workflow focused on direct navigation.

## What Changes

- Place a bubble-only action strip immediately below the Change Only viewer controls in the comparison UI.
- Remove descriptive difference text and summary content from the Modified Ontology panel.
- Remove extra Modified Ontology section content so the panel focuses on bubble navigation only.
- Preserve existing click and keyboard behavior so each bubble still navigates to the same Pre/Post target path.
- Keep bubble action order stable and visually clear.

## Capabilities

### New Capabilities
- `modified-ontology-bubble-only-action-strip`: Render only ordered bubble actions under Change Only controls and remove descriptive difference content from Modified Ontology.

### Modified Capabilities
- None.

## Impact

- Frontend compare layout in App-level Modified Ontology rendering and pane header/control placement.
- Frontend CSS for bubble strip positioning, spacing, active/focus states, and responsive behavior.
- Frontend tests covering bubble-only rendering, placement under controls, and preserved navigation semantics.
