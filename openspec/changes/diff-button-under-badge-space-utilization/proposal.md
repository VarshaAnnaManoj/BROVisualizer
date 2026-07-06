## Why

Diff buttons still leave underused space beneath the PRE ONLY and POST ONLY badges, which makes each card look sparse and harder to scan. Using that vertical space for concise path/value context will improve clarity and information density.

## What Changes

- Redesign presence-diff button composition to place concise path and value details directly under the PRE ONLY/POST ONLY badge area.
- Improve vertical layout so the badge anchors the first row and useful text occupies the remaining button body without whitespace gaps.
- Keep labels concise and readable while preserving full navigation semantics in accessibility labels.
- Ensure the new stacked layout remains clean on desktop and mobile breakpoints.

## Capabilities

### New Capabilities
- `badge-underflow-content-layout`: Utilize button space beneath PRE ONLY/POST ONLY badges with structured, readable diff content.
- `stacked-diff-button-density`: Increase diff-button information density without harming readability or interaction behavior.

### Modified Capabilities
- None.

## Impact

- Diff button markup and text composition in frontend/src/App.tsx.
- Diff button layout, spacing, and wrapping styles in frontend/src/App.css.
- Regression tests for structure/readability behavior in frontend/src/App.test.tsx.
- No backend/API changes.
