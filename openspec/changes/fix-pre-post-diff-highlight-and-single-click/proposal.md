## Why

Pre/Post comparison currently creates misleading visual output: broad pane-level highlighting appears when only one capability entry is missing, and the Single mode toggle often requires double-click. In addition, attachment placeholder labels such as "Pasted Image" and "Pasted Image#3" add noise that users do not want in the workflow.

## What Changes

- Tighten Pre/Post diff highlight targeting so only the exact missing or changed JSON item is highlighted.
- Prevent whole-pane or broad-block highlight when a category/capability exists only on one side.
- Fix Single mode button interaction so a single click reliably switches mode.
- Remove attachment placeholder labels from the UI, including "Pasted Image" and numbered variants like "Pasted Image#3".
- Add regression tests for missing-entry highlight scope, Single button click behavior, and hidden attachment placeholders.

## Capabilities

### New Capabilities
- `precise-pre-post-diff-highlighting`: Scope highlights to exact changed/missing entries instead of large unrelated JSON sections.
- `single-click-view-mode-toggle`: Ensure Single mode is activated by one click without requiring repeat interaction.
- `attachment-placeholder-suppression`: Suppress attachment placeholder labels (for example, "Pasted Image" variants) from the user-visible dashboard flow.

### Modified Capabilities
- None.

## Impact

- Frontend comparison behavior and interaction logic in App-level state/event handling.
- Frontend highlight rendering logic and styles in Pre/Post JSON viewers.
- Frontend automated tests for compare interaction and UI content assertions.
- No backend API, database, or service contract changes.
