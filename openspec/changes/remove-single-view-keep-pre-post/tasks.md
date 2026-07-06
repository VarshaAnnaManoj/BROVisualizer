## 1. Remove Single Mode Controls

- [x] 1.1 Remove the Single tab/button from the toolbar mode selector in the frontend app.
- [x] 1.2 Remove Single-mode-specific state variables and mode-switch handlers that are no longer needed.
- [x] 1.3 Ensure comparison mode is the default and only mode on initial render.

## 2. Simplify Rendering And Data Flow

- [x] 2.1 Remove Single-view rendering branch and keep only Pre/Post/Modified comparison rendering.
- [x] 2.2 Remove Single-mode-specific fetch/update loop and keep pane-based compare loading only.
- [x] 2.3 Verify refresh/load actions continue to work correctly in compare-only flow.

## 3. Regression Tests

- [x] 3.1 Update tests to assert Single mode control is absent.
- [x] 3.2 Add tests that confirm compare panes are visible by default at app load.
- [x] 3.3 Add/adjust tests to ensure compare-only data flow works after removing Single branch.

## 4. Validation

- [x] 4.1 Run frontend test suite and fix any regressions.
- [x] 4.2 Run frontend build to confirm compile and bundle success.
- [x] 4.3 Perform manual UI check for compare-only workflow and prepare the change for /opsx:apply.
