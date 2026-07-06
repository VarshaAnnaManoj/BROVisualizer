## 1. Toggle Control and State Setup

- [x] 1.1 Add per-pane viewer mode state (`change-only` / `complete-json`) for Pre and Post panes
- [x] 1.2 Initialize both pane modes to `change-only` by default
- [x] 1.3 Add top-of-pane two-option toggle controls with clear labels (`Change Only`, `Complete JSON`)

## 2. Mode-Specific JSON Rendering

- [x] 2.1 Implement change-only rendering data pipeline for each pane based on current diff paths
- [x] 2.2 Implement complete-json rendering path for each pane when toggle is switched
- [x] 2.3 Ensure mode switching updates pane content without breaking highlight/navigation behavior

## 3. UX and Interaction Consistency

- [x] 3.1 Keep toggle controls accessible (role semantics, selected state, keyboard focus)
- [x] 3.2 Ensure mode behavior remains stable when pane IDs/versions are changed or refreshed
- [x] 3.3 Preserve existing compare/modified panel behavior and avoid regressions in diff listings

## 4. Tests and Validation

- [x] 4.1 Add frontend test for default `Change Only` mode on initial load
- [x] 4.2 Add frontend test for switching to `Complete JSON` and showing full pane content
- [x] 4.3 Add frontend test for returning to `Change Only` and showing filtered content
- [x] 4.4 Run full frontend test suite and build validation
