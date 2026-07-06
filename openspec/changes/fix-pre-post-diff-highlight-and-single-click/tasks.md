## 1. Diff Highlight Precision

- [x] 1.1 Refine Pre/Post path-to-node resolution in frontend comparison logic to target the smallest relevant JSON node.
- [x] 1.2 Prevent broad fallback behavior that highlights whole panes or unrelated parent blocks when one-sided entries are missing.
- [x] 1.3 Add regression tests for one-sided missing capability/category cases (Post-only and Pre-only).

## 2. Single Button Interaction Reliability

- [x] 2.1 Consolidate Single mode click handling into one deterministic state transition path.
- [x] 2.2 Remove or correct any state timing behavior that causes first-click no-op and double-click dependence.
- [x] 2.3 Add interaction tests that verify Single mode activates on first click from compare mode and after toggle sequences.

## 3. Attachment Placeholder Suppression

- [x] 3.1 Implement render-layer filtering for placeholder labels such as "Pasted Image" and numbered variants.
- [x] 3.2 Ensure suppression logic does not remove legitimate ontology/domain text.
- [x] 3.3 Add UI tests validating placeholder labels are absent while normal content remains visible.

## 4. Validation And Completion

- [x] 4.1 Run frontend test suite and confirm all new/updated tests pass.
- [x] 4.2 Perform manual verification of compare highlighting and Single-click behavior in the running UI.
- [x] 4.3 Update change checklist statuses after implementation and prepare for apply/archive workflow.
