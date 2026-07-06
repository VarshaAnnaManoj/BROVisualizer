## 1. Restore Source Viewer Presentation

- [x] 1.1 Revert Pre and Post pane rendering from path-row view back to full JSON block viewer format.
- [x] 1.2 Preserve source-pane labels and existing load/retry controls while restoring viewer layout.
- [x] 1.3 Ensure restored JSON block view remains readable on desktop and mobile breakpoints.

## 2. Keep Modified-to-Source Navigation

- [x] 2.1 Retain Modified Ontology button actions for PRE ONLY and POST ONLY entries.
- [x] 2.2 Ensure each Modified button routes to the respective source pane context and path metadata.
- [x] 2.3 Preserve changed-entry dual actions (Pre target and Post target) in Modified pane.

## 3. Add Roundtrip Return Flow

- [x] 3.1 Add explicit “Back to Modified Ontology” action when source navigation is active.
- [x] 3.2 Implement return action behavior to restore Modified pane context/focus.
- [x] 3.3 Keep active source-path context visible until user returns or selects a new target.

## 4. Accessibility And Interaction Quality

- [x] 4.1 Ensure Modified navigation actions remain keyboard operable (Tab + Enter/Space).
- [x] 4.2 Ensure Back-to-Modified control is keyboard accessible with visible focus state.
- [x] 4.3 Verify active/return states are visually clear without breaking existing styling patterns.

## 5. Verification

- [x] 5.1 Add/update tests confirming Pre/Post panes are restored to full JSON block viewer rendering.
- [x] 5.2 Add/update tests for Modified entry navigation to Pre/Post source context.
- [x] 5.3 Add/update tests for return-to-Modified roundtrip behavior.
- [x] 5.4 Add/update tests for keyboard activation on navigation and return controls.
- [x] 5.5 Run frontend test and build verification for regression safety.
