## 1. Layout Density Baseline

- [x] 1.1 Measure current metadata panel dimensions, card widths, and spacing values in the compare layout
- [x] 1.2 Identify CSS selectors controlling shaded area fill, panel width, and metadata card min-height
- [x] 1.3 Define target compact spacing/width values for desktop while preserving readability

## 2. Metadata Width and Whitespace Optimization

- [x] 2.1 Reduce metadata panel width allocation and rebalance analysis grid proportions
- [x] 2.2 Decrease metadata card/column widths and tighten panel/card padding and gaps
- [x] 2.3 Adjust card min-height and internal typography spacing to reduce sparse vertical whitespace

## 3. Responsive and Readability Safeguards

- [x] 3.1 Keep long metadata text wrapping rules to prevent clipping after width reduction
- [x] 3.2 Tune tablet/mobile breakpoints so compact layout remains usable without excess blank regions
- [x] 3.3 Validate that compare panes remain usable and visually balanced after metadata compaction

## 4. Verification and Regression Coverage

- [x] 4.1 Add/adjust frontend tests for metadata panel structure after compact sizing changes
- [x] 4.2 Add/adjust frontend tests ensuring compare panes and metadata panel still co-render correctly
- [x] 4.3 Run frontend test suite and production build to validate no regressions
- [x] 4.4 Perform visual QA against the requested dense design behavior and iterate CSS values if needed
