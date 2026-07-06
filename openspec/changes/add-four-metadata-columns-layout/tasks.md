## 1. Data Mapping and Layout Scaffold

- [x] 1.1 Identify current metadata data flow in compare view and map fields: change_description, hierarchy_assessment, validation_notes, change_reason
- [x] 1.2 Add frontend metadata normalization utility for null/empty/non-string values with deterministic placeholder rendering
- [x] 1.3 Create four-column metadata panel scaffold with fixed label/value order

## 2. Four-Column Rendering Integration

- [x] 2.1 Integrate metadata panel into compare page layout without regressing Pre/Post/Modified panes
- [x] 2.2 Bind normalized metadata field values to each of the four columns
- [x] 2.3 Add accessibility-friendly labels/headings for each metadata column

## 3. Responsive and Visual Stability

- [x] 3.1 Implement responsive CSS breakpoints for 4-column -> 2-column -> 1-column transitions
- [x] 3.2 Ensure long text wrapping and spacing rules prevent clipping/overflow in metadata columns
- [x] 3.3 Validate panel remains readable and stable when one or more fields are placeholder values

## 4. Tests and Validation

- [x] 4.1 Add frontend test for rendering all four column labels with populated values
- [x] 4.2 Add frontend test for placeholder display when metadata fields are missing/null
- [x] 4.3 Add frontend test for stable compare panel rendering with metadata panel present
- [x] 4.4 Add/adjust responsive layout assertions where feasible and run full frontend test/build validation
