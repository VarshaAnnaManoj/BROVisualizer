## 1. Under-Badge Content Structure

- [x] 1.1 Update presence-diff button markup in frontend/src/App.tsx so path/value text is positioned beneath the PRE ONLY/POST ONLY badge area.
- [x] 1.2 Keep full-path navigation context in aria labels while showing concise on-button text.
- [x] 1.3 Ensure under-badge content remains clear for both PRE ONLY and POST ONLY entries.

## 2. Dense Button Layout And Wrapping

- [x] 2.1 Update diff-button CSS in frontend/src/App.css to remove whitespace-heavy gaps and use stacked dense blocks.
- [x] 2.2 Add wrap/overflow rules so path and value text fill under-badge space cleanly without fragmented line breaks.
- [x] 2.3 Verify responsive behavior so dense layout remains readable on desktop and mobile breakpoints.

## 3. Interaction And Accessibility Integrity

- [x] 3.1 Ensure click/keyboard activation behavior remains unchanged after under-badge layout update.
- [x] 3.2 Preserve active/focus-visible styling and semantic clarity in dense layout.

## 4. Verification

- [x] 4.1 Add/update tests in frontend/src/App.test.tsx for under-badge content placement and concise text rendering.
- [x] 4.2 Add/update tests that confirm navigation labels/behavior are preserved.
- [x] 4.3 Run npm run test and npm run build in frontend for regression safety.
