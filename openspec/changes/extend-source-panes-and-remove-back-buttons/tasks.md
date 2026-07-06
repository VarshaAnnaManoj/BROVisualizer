## 1. Source Pane Layout Updates

- [x] 1.1 Update comparison pane structure in frontend/src/App.tsx so active source banners are compact and source viewer area extends downward.
- [x] 1.2 Remove duplicated “Back to Modified Ontology” buttons from Pre/Post source banners.
- [x] 1.3 Keep focused path text visible in both source banners after control removal.

## 2. Styling For Vertical Fill And Control Reduction

- [x] 2.1 Update source-pane and code-view CSS in frontend/src/App.css to reduce empty lower-page space and improve vertical fill.
- [x] 2.2 Tune banner spacing/height so active-path context remains readable without adding dead space.
- [x] 2.3 Ensure responsive behavior stays clean for tablet/mobile breakpoints.

## 3. Behavior And Accessibility Verification

- [x] 3.1 Verify navigation from Modified pane still focuses/highlights Pre/Post paths correctly.
- [x] 3.2 Verify removal of banner back buttons does not regress keyboard/accessibility semantics.

## 4. Regression Coverage

- [x] 4.1 Update frontend/src/App.test.tsx assertions to reflect back-button removal in source banners.
- [x] 4.2 Add/update tests validating preserved focused-path context and highlight behavior.
- [x] 4.3 Run npm run test and npm run build in frontend.
