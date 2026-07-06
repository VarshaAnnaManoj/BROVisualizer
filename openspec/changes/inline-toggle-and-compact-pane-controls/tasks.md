## 1. Pane Toggle Layout Alignment

- [x] 1.1 Identify current pane header/toggle container CSS causing vertical stacking
- [x] 1.2 Update pane toggle container to keep `Change Only` and `Complete JSON` in one row for desktop widths
- [x] 1.3 Preserve selected-state semantics (`aria-selected`, active styles) after inline layout update

## 2. Compact Pane Input Controls

- [x] 2.1 Reduce ID/version input widths and tune button widths/gaps in Pre/Post pane form rows
- [x] 2.2 Ensure compact controls retain readable text and visible focus styles
- [x] 2.3 Validate compact controls do not break pane header alignment with toggle row

## 3. Placeholder Noise Suppression

- [x] 3.1 Verify and harden suppression for `Pasted Image` and numbered variants in pane-rendered JSON
- [x] 3.2 Ensure mixed arrays keep legitimate values while only placeholder entries are removed
- [x] 3.3 Confirm suppression does not affect non-placeholder text values

## 4. Tests and Validation

- [x] 4.1 Add/adjust frontend tests for inline toggle row behavior in pane headers
- [x] 4.2 Add/adjust frontend tests for compact pane input controls remaining present/usable
- [x] 4.3 Add/adjust frontend tests for pasted-image placeholder suppression behavior
- [x] 4.4 Run frontend test suite and build to confirm no regressions
