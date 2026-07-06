## Why

Diff action buttons currently show excessive whitespace and awkward line breaks, making labels hard to scan and consuming too much card space. Users need concise, readable button text with controlled wrapping that preserves path clarity.

## What Changes

- Redesign diff-button text composition to show concise labels instead of long unbounded path fragments.
- Add controlled text wrapping and overflow behavior so button content wraps naturally without fragmented words.
- Keep key context visible (type badge, path hint, value preview) while reducing visual clutter.
- Ensure readability and layout stability across desktop and mobile breakpoints.

## Capabilities

### New Capabilities
- `concise-diff-button-labels`: Render short, clear diff button text with stable path hints.
- `controlled-diff-button-text-wrap`: Apply predictable wrapping and spacing rules to remove whitespace-heavy button layouts.

### Modified Capabilities
- None.

## Impact

- Diff entry rendering and label formatting logic in frontend/src/App.tsx.
- Diff button typography/spacing/wrap styles in frontend/src/App.css.
- UI behavior assertions in frontend/src/App.test.tsx.
- No backend or API changes.
