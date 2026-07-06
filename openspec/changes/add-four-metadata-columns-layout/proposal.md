## Why

The new design introduces four metadata columns (change_description, hierarchy_assessment, validation_notes, change_reason) that are important for review decisions but are not consistently presented in a side-by-side structured layout. Aligning the UI now improves readability and reduces context switching when evaluating ontology changes.

## What Changes

- Add a dedicated four-column metadata panel aligned to the new design.
- Surface `change_description`, `hierarchy_assessment`, `validation_notes`, and `change_reason` as first-class displayed fields in the compare view.
- Define fallback behavior for missing values so the layout remains stable and readable.
- Add responsive behavior so the four-column panel remains usable on smaller viewports.
- Add/update frontend tests to validate column labels, values, and fallback rendering.

## Capabilities

### New Capabilities
- `four-column-metadata-panel`: Render the four requested metadata fields in a consistent four-column layout beside the modified ontology panel.
- `metadata-column-fallback-rendering`: Provide deterministic placeholders when any of the four metadata fields are absent.
- `responsive-metadata-column-layout`: Preserve readability and structure of the four-column metadata section across desktop and mobile widths.

### Modified Capabilities
- None.

## Impact

- Frontend compare screen layout and component structure.
- Metadata rendering logic in the React app where ontology response fields are consumed.
- UI test coverage for metadata panel rendering and responsiveness.
- Potential CSS updates for grid behavior, spacing, and typography in metadata sections.
