## 1. Diff Action Grouping Foundations

- [x] 1.1 Locate modified-pane action generation logic and identify where missing-node paths are transformed into buttons
- [x] 1.2 Add helper logic to detect ancestor/descendant relationships for diff paths and canonicalize parent branch paths
- [x] 1.3 Add deterministic ordering for grouped parent actions to keep list rendering stable

## 2. Parent-First Missing Branch Action Generation

- [x] 2.1 Build grouped missing-branch action entries using parent paths (for example, `...Services.Duct & Furnace Cleaning`)
- [x] 2.2 Suppress child action entries (`metadata`, `explicit_skills`, `implicit_skills`, nested values/items) when ancestor missing action exists
- [x] 2.3 Ensure grouped parent action continues to navigate/highlight the correct pre/post pane target

## 3. Preserve Valid Granular Behavior

- [x] 3.1 Keep child-level action generation unchanged when parent exists on both sides and only descendants differ
- [x] 3.2 Ensure suppression is ancestor-scoped and does not remove actions from unrelated branches
- [x] 3.3 Validate rendered labels/previews remain readable with service names containing spaces and symbols

## 4. Test Coverage and Regression Checks

- [x] 4.1 Add frontend test: missing hierarchy branch renders exactly one action button
- [x] 4.2 Add frontend test: descendant metadata/skills actions are not rendered when parent missing action exists
- [x] 4.3 Add frontend test: unrelated branch changes still render granular buttons
- [x] 4.4 Add frontend test: parent-present descendant changes continue to render child-level actions
