## 1. Bubble Action Rendering

- [x] 1.1 Locate the Modified Ontology difference action rendering path and identify where action labels/buttons are currently composed
- [x] 1.2 Render each difference action with a visible ordinal index (1, 2, 3, ...) bound to stable list order
- [x] 1.3 Keep each numbered bubble tied to the same navigation handler and target metadata used today

## 2. Bubble Styling and Layout

- [x] 2.1 Add scoped styles for circular numbered bubbles, including default, hover, active, and selected visual states
- [x] 2.2 Keep readable difference context text adjacent to each bubble so users can understand each action
- [x] 2.3 Add responsive rules so bubble actions remain usable and aligned on narrower viewports

## 3. Accessibility and Interaction

- [x] 3.1 Ensure numbered bubble actions remain semantic buttons with keyboard operability
- [x] 3.2 Preserve visible focus styles and active-state indication for keyboard and pointer interaction
- [x] 3.3 Verify numbering and activation behavior remain correct when difference entries are filtered or re-rendered

## 4. Tests and Validation

- [x] 4.1 Add or update frontend tests to verify numbered bubble rendering and ordering
- [x] 4.2 Add or update frontend tests to verify bubble activation triggers existing navigation/highlight behavior
- [x] 4.3 Add or update frontend tests to verify accessibility semantics and active/focus state behavior
- [x] 4.4 Run frontend tests and build to confirm no regressions
