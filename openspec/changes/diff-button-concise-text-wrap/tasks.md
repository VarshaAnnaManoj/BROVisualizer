## 1. Concise Button Labeling

- [x] 1.1 Add a path-label formatting helper in frontend/src/App.tsx to generate concise visual path text for diff buttons.
- [x] 1.2 Update presence and changed-entry button markup to use concise text blocks while preserving full-path aria labels.
- [x] 1.3 Verify concise labels remain unambiguous for repeated branch paths.

## 2. Controlled Text Wrapping And Spacing

- [x] 2.1 Update diff button layout styles in frontend/src/App.css to reduce whitespace-heavy rendering and define clear text regions.
- [x] 2.2 Add predictable wrapping/overflow rules for path and value text blocks to prevent fragmented line breaks.
- [x] 2.3 Validate responsive readability at desktop/mobile breakpoints without clipping badge/path/value content.

## 3. Interaction And Accessibility Safeguards

- [x] 3.1 Ensure click and keyboard activation continue to trigger existing navigation/highlight behavior after label and wrap updates.
- [x] 3.2 Preserve focus-visible and active states for wrapped buttons.

## 4. Verification

- [x] 4.1 Add/update tests in frontend/src/App.test.tsx for concise label rendering and wrapped text structure assumptions.
- [x] 4.2 Add/update tests that ensure navigation behavior remains unchanged with new button text formatting.
- [x] 4.3 Run npm run test and npm run build in frontend for regression safety.
