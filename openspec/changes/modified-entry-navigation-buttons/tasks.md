## 1. Diff Entry Interaction Model

- [x] 1.1 Extend modified diff entry model with source metadata (`sourcePane`, `path`, `entryType`) for button-driven navigation.
- [x] 1.2 Refactor Modified Ontology rendering to output diff entries as buttons with consistent labels/chips.
- [x] 1.3 Keep changed paths as dual actions (Pre target and Post target) within the same row.

## 2. Combined PRE/POST Window

- [x] 2.1 Merge `PRE ONLY` and `POST ONLY` entries into a single diff list container in Modified Ontology.
- [x] 2.2 Add clear category indicators so users can distinguish Pre and Post origin inside the combined list.
- [x] 2.3 Preserve deterministic ordering in the merged list for stable repeated comparisons.

## 3. Source Navigation Behavior

- [x] 3.1 Add stable path anchors in Pre/Post JSON viewers for click target resolution.
- [x] 3.2 Implement click handlers that route `PRE ONLY` entries to Pre viewer path and `POST ONLY` entries to Post viewer path.
- [x] 3.3 Implement changed-entry navigation actions that route to respective Pre/Post source paths.
- [x] 3.4 Add active target highlighting/focus feedback after navigation.

## 4. Accessibility And UX

- [x] 4.1 Ensure diff entry buttons are keyboard accessible (Tab + Enter/Space activation).
- [x] 4.2 Add visible focus states and active states for navigation buttons and source pane context.
- [x] 4.3 Verify combined window remains readable and operable on desktop and mobile breakpoints.

## 5. Verification

- [x] 5.1 Add/update tests for merged PRE ONLY + POST ONLY rendering in one window.
- [x] 5.2 Add/update tests for click navigation to Pre/Post source viewers by entry type.
- [x] 5.3 Add/update tests for changed-row dual navigation actions.
- [x] 5.4 Add/update tests for keyboard activation behavior.
- [x] 5.5 Run frontend test and build verification for regression safety.
