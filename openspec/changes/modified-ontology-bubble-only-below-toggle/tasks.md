## 1. Bubble-Only Placement Under Controls

- [x] 1.1 Identify where Change Only controls and Modified Ontology body are rendered in compare mode
- [x] 1.2 Move or render the bubble action strip immediately below Change Only controls
- [x] 1.3 Ensure bubble strip ordering remains stable across re-renders and data refreshes

## 2. Remove Modified Ontology Descriptive Content

- [x] 2.1 Remove diff legends, section headings, and descriptive path/value text from Modified Ontology display
- [x] 2.2 Keep only bubble actions visible in Modified Ontology when differences exist
- [x] 2.3 Define empty state behavior for zero differences without restoring descriptive content

## 3. Interaction and Accessibility Preservation

- [x] 3.1 Keep bubble actions as semantic buttons with keyboard operability
- [x] 3.2 Preserve existing bubble click/keyboard navigation target behavior in Pre/Post panes
- [x] 3.3 Preserve visible active and focus states for bubble actions after layout changes

## 4. Validation and Regression Coverage

- [x] 4.1 Add or update frontend tests for bubble strip placement directly below Change Only controls
- [x] 4.2 Add or update frontend tests to confirm absence of descriptive Modified Ontology content
- [x] 4.3 Add or update frontend tests for preserved navigation and accessibility behavior
- [x] 4.4 Run frontend tests and build to confirm no regressions
