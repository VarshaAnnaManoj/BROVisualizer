## 1. Source Focus Context Behavior

- [x] 1.1 Update Modified-entry navigation flow in `frontend/src/App.tsx` to ensure selected action activates the corresponding Pre/Post source section context.
- [x] 1.2 Ensure active source path metadata is shown consistently for focused source context after Modified click actions.
- [x] 1.3 Preserve existing changed-entry dual-action behavior while aligning focus context handling with PRE/POST button intent.

## 2. Background Highlight Styling

- [x] 2.1 Add or refine source-section active background highlight styles in `frontend/src/App.css` for clear contrast against inactive sections.
- [x] 2.2 Ensure highlight styles remain readable and responsive across desktop and mobile breakpoints.
- [x] 2.3 Verify highlight and focus states do not conflict with existing chip/button and pane styles.

## 3. Roundtrip And Accessibility

- [x] 3.1 Preserve Back to Modified Ontology control behavior so active source focus/highlight state clears on return.
- [x] 3.2 Ensure keyboard activation (Tab + Enter/Space) works for Modified navigation actions and return control.
- [x] 3.3 Validate visible focus indicators remain clear for keyboard users during source-focus and return interactions.

## 4. Verification

- [x] 4.1 Update/add tests in `frontend/src/App.test.tsx` for source focus context activation from Modified pane actions.
- [x] 4.2 Update/add tests for active source background-highlight state and return-to-modified clearing behavior.
- [x] 4.3 Run `npm run test` and `npm run build` in `frontend/` to confirm regression safety.
