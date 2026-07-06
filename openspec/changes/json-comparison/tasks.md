## 1. Diff Engine Foundations

- [x] 1.1 Refactor comparison state so the third pane is derived from loaded Pre/Post JSON instead of independent fetch state.
- [x] 1.2 Implement JSON normalization and path-flattening utilities for nested objects and arrays.
- [x] 1.3 Implement deterministic diff classification for added (Post-only), removed (Pre-only), and changed values.

## 2. Rendering And Interaction

- [x] 2.1 Replace third-pane renderer with grouped Added/Removed/Changed sections and path-level entries.
- [x] 2.2 Apply highlight semantics: yellow for Pre-only/removal entries and green for Post-only/addition entries.
- [x] 2.3 Add textual badges/labels so differences remain understandable beyond color alone.

## 3. Array Handling And Stability

- [x] 3.1 Implement hybrid array comparison that prefers keyed matching by id and falls back to index-based comparison.
- [x] 3.2 Ensure stable output ordering for repeated comparisons with identical inputs.
- [x] 3.3 Add safeguards to avoid unnecessary recomputation when Pre/Post payloads have not changed.

## 4. Responsive UX And Validation

- [x] 4.1 Update diff pane layout and CSS for readable desktop and mobile presentation.
- [x] 4.2 Confirm Pre/Post controls remain operable and non-overlapping while diff output is visible.
- [x] 4.3 Add helper text clarifying that third-pane content is derived from current Pre/Post selections.

## 5. Verification

- [x] 5.1 Add unit/component tests for Pre-only and Post-only path highlighting behavior.
- [x] 5.2 Add tests for changed-value paired rendering at the same JSON path.
- [x] 5.3 Add tests for nested structures and array comparison fallback behavior.
- [x] 5.4 Run frontend test and build verification to confirm regression safety.
