## 1. Path Resolution Accuracy

- [x] 1.1 Refactor active-path parsing in frontend/src/App.tsx to extract full token lineage including nested keys and optional array indexes.
- [x] 1.2 Update highlight-range lookup logic to match entries using full path lineage instead of key-only matching.
- [x] 1.3 Ensure indexed paths highlight only the addressed array item and not sibling items or parent blocks.

## 2. Fallback Behavior

- [x] 2.1 Implement deterministic fallback selection for unresolved exact targets within the same selected path lineage.
- [x] 2.2 Prevent fallback from highlighting unrelated top-level branches when exact targets are missing.
- [x] 2.3 Preserve visible source-context metadata during exact or fallback highlighting.

## 3. Visual And Interaction Consistency

- [x] 3.1 Confirm exact-target and fallback highlights remain visually distinct and readable in frontend/src/App.css.
- [x] 3.2 Verify highlight behavior remains consistent with existing Pre/Post active-pane states and navigation controls.

## 4. Regression Validation

- [x] 4.1 Add or update tests in frontend/src/App.test.tsx for exact array-index targeting and repeated-key branch selection.
- [x] 4.2 Add or update tests for controlled fallback behavior when exact target resolution fails.
- [x] 4.3 Run npm run test and npm run build in frontend to validate regression safety.
