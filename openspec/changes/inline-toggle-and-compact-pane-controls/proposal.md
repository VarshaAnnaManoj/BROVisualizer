## Why

Pre/Post pane controls currently consume extra vertical space and can wrap `Complete JSON` under `Change Only`, reducing clarity. Users also requested removal of visible “Pasted Image” noise so the interface and data views stay clean and focused.

## What Changes

- Keep `Change Only` and `Complete JSON` toggle buttons on a single line in each pane header.
- Reduce pane input control widths (ID/version/load/retry row) to create a tighter, compact control strip.
- Remove/suppress any `Pasted Image` placeholder label noise from pane-visible text output and control areas.
- Ensure compact controls remain usable and readable across responsive breakpoints.
- Add/update frontend tests for inline toggle rendering, compact controls, and placeholder suppression behavior.

## Capabilities

### New Capabilities
- `inline-pane-viewer-toggle-layout`: Render `Change Only` and `Complete JSON` toggles in one horizontal row without unintended wrapping in standard desktop view.
- `compact-pane-input-controls`: Reduce Pre/Post pane input control widths and spacing while maintaining usability.
- `pasted-image-placeholder-noise-suppression`: Prevent `Pasted Image` placeholder tokens from appearing in pane JSON content or related visible labels.

### Modified Capabilities
- None.

## Impact

- Frontend pane header/control layout CSS and JSX structure in compare view.
- JSON sanitization/output display logic where placeholder content is filtered.
- Frontend regression tests for pane toggle layout and placeholder behavior.
- Visual density and alignment of Pre/Post control regions.
