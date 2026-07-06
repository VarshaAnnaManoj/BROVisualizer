## Why

Current JSON display in the app is optimized for ontology comparison but not for general-purpose exploration and formatting. A dedicated JSON viewer/formatter experience similar to online JSON viewer tools will help users inspect, expand/collapse, search, and format arbitrary JSON quickly.

## What Changes

- Add an advanced JSON viewer/formatter experience inspired by Online JSON Viewer and Formatter behavior.
- Support raw JSON input/paste, validation feedback, pretty formatting, and minify actions.
- Add collapsible tree navigation for objects/arrays with expand/collapse all controls.
- Add JSON path-oriented exploration aids such as path labels and search/filter within JSON keys/values.
- Preserve existing ontology comparison workflows while enabling this viewer as a dedicated mode/screen.

## Capabilities

### New Capabilities
- `interactive-json-viewer-formatter`: Provide a full interactive JSON viewing and formatting tool with validation, tree navigation, and formatting controls.

### Modified Capabilities
- None.

## Impact

- Frontend UI components and state management for JSON editor/viewer mode.
- Frontend rendering logic for large nested JSON structures.
- Possible utility additions for parsing, formatting, and search in JSON trees.
- Tests for JSON parsing errors, tree interaction, and formatting actions.
