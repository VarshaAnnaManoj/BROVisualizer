## 1. Viewer Mode Setup

- [x] 1.1 Add a dedicated JSON viewer/formatter entry point (route or mode toggle) in frontend.
- [x] 1.2 Create core viewer component structure for input panel, controls, and tree output.
- [x] 1.3 Ensure existing ontology compare flows remain unaffected when viewer mode is not used.

## 2. Parsing and Formatting Features

- [x] 2.1 Implement JSON parse validation with clear error messaging for invalid input.
- [x] 2.2 Implement pretty-format action with consistent indentation.
- [x] 2.3 Implement minify action and clear/reset actions for input/output state.

## 3. Tree Navigation and Search

- [x] 3.1 Implement collapsible JSON tree rendering with stable node path identifiers.
- [x] 3.2 Add node-level toggle and global expand-all/collapse-all controls.
- [x] 3.3 Implement search/filter with match highlighting for keys and scalar values.
- [x] 3.4 Show JSON path context for selected/focused nodes.

## 4. Performance and Quality

- [x] 4.1 Add guardrails for large payload rendering (lazy expand and optional virtualization threshold).
- [x] 4.2 Add frontend tests for parse errors, formatting actions, and tree toggle/search behavior.
- [x] 4.3 Validate responsive layout and usability on desktop/mobile viewports.
