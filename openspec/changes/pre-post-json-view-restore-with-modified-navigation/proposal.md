## Why

The recent path-row rendering in Pre and Post panes reduced readability compared to the original full JSON viewer format users were relying on. The UI should restore the original Pre/Post JSON viewer experience while preserving Modified Ontology click navigation and adding a clear way to return from source JSON context back to the Modified pane.

## What Changes

- Restore Pre and Post panes to their previous raw JSON viewer presentation.
- Keep Modified Ontology entries clickable so they navigate to the exact source section where the underlying change exists.
- Add explicit return navigation from Pre/Post source context back to the Modified Ontology pane.
- Preserve existing diff semantics (Pre-only, Post-only, changed values) and source-aware routing behavior.
- Maintain keyboard accessibility and responsive usability across all navigation actions.

## Capabilities

### New Capabilities
- `source-json-roundtrip-navigation`: Support two-way navigation between Modified Ontology entries and source JSON context, including return-to-Modified action.

### Modified Capabilities
- None.

## Impact

- Frontend comparison pane rendering and navigation state management in the app UI.
- Frontend styles for source-focus and return controls.
- Frontend tests covering restore behavior and roundtrip navigation interactions.
- No backend API or schema changes.
