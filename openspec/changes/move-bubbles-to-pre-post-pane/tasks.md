## 1. Derive Source-Local Bubble Actions

- [x] 1.1 Identify current bubble action derivation and split it into Pre-target and Post-target collections
- [x] 1.2 Preserve deterministic ordering for each per-pane bubble list across re-renders
- [x] 1.3 Keep existing action metadata (target path and source pane) needed for navigation and active state

## 2. Render Bubbles In Respective Pane Locations

- [x] 2.1 Add Pre bubble strip in Pre pane location and Post bubble strip in Post pane location
- [x] 2.2 Remove centralized bubble placement so controls are no longer anchored in the old location
- [x] 2.3 Add responsive wrapping/spacing styles so per-pane bubble strips remain usable on smaller viewports

## 3. Preserve Behavior and Accessibility

- [x] 3.1 Keep bubbles as semantic buttons with existing aria-label path semantics
- [x] 3.2 Preserve click and keyboard activation behavior to navigate/highlight target paths
- [x] 3.3 Preserve visible focus and active-state styling in both pane-local strips

## 4. Validation and Regression Coverage

- [x] 4.1 Add or update tests to verify bubbles render in respective Pre/Post locations
- [x] 4.2 Add or update tests to verify navigation/highlight behavior remains unchanged from bubble activation
- [x] 4.3 Add or update tests to verify stable ordering and keyboard operability in per-pane strips
- [x] 4.4 Run frontend tests and build to confirm no regressions
