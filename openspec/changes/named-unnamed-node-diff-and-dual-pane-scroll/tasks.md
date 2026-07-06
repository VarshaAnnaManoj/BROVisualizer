## 1. Named And Unnamed Node Coverage

- [x] 1.1 Update path normalization in frontend/src/App.tsx to represent named and unnamed node lineage consistently.
- [x] 1.2 Extend diff-entry generation to include unnamed-node changes with stable lineage-aware path labels.
- [x] 1.3 Ensure repeated key names across branches resolve to correct lineage-specific highlight targets.

## 2. Dual-Pane Scroll Navigation

- [x] 2.1 Implement navigation behavior so diff action clicks resolve targets for both Pre and Post panes.
- [x] 2.2 Add synchronized scrolling for Pre and Post panes to reveal highlighted regions after one click.
- [x] 2.3 Implement same-lineage fallback scroll behavior when exact target is missing in one pane.

## 3. Highlight And Focus Consistency

- [x] 3.1 Preserve visible highlight state and focused path metadata after dual-pane scrolling.
- [x] 3.2 Ensure keyboard activation (Enter/Space) triggers the same dual-pane scroll and highlight behavior.
- [x] 3.3 Confirm highlight styling remains readable and consistent for named and unnamed node targets.

## 4. Regression Validation

- [x] 4.1 Add/update tests in frontend/src/App.test.tsx for named-node and unnamed-node change coverage.
- [x] 4.2 Add/update tests for synchronized Pre/Post scrolling and fallback behavior.
- [x] 4.3 Run npm run test and npm run build in frontend for regression safety.
