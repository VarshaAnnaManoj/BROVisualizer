## Context

The compare view now emphasizes Pre/Post/Modified JSON, while the new design additionally requires four metadata fields (`change_description`, `hierarchy_assessment`, `validation_notes`, `change_reason`) to be displayed as a structured panel. These fields already exist in ontology responses but require a consistent and readable multi-column presentation that matches the new UI direction.

## Goals / Non-Goals

**Goals:**
- Add a four-column metadata section that clearly surfaces the four requested fields.
- Keep layout stable when one or more fields are empty, null, or unavailable.
- Ensure layout works on desktop and adapts on smaller screens without truncating critical text.
- Preserve existing compare behaviors for Pre/Post/Modified panels.

**Non-Goals:**
- No backend schema changes for ontology payload fields.
- No behavioral changes to diff calculation or navigation logic.
- No redesign of unrelated dashboard sections outside the metadata panel area.

## Decisions

1. Dedicated four-column metadata grid adjacent to compare content.
- Decision: Render metadata as four labeled columns/cards in a consistent order: change_description, hierarchy_assessment, validation_notes, change_reason.
- Rationale: Fixed order reduces scan time and supports rapid decision workflows.
- Alternative considered: accordion or stacked list. Rejected because side-by-side comparison is required by design.

2. Fallback rendering for missing values.
- Decision: Display a deterministic placeholder (for example, "Not available") for missing/null field values.
- Rationale: Maintains visual stability and prevents empty-column confusion.
- Alternative considered: hide empty columns. Rejected because it causes shifting layouts and inconsistent reading patterns.

3. Responsive behavior via breakpoint-based grid collapse.
- Decision: Use CSS grid breakpoints to move from 4 columns to 2 columns and then 1 column on narrow screens.
- Rationale: Preserves readability and avoids horizontal overflow.
- Alternative considered: fixed horizontal scroll region. Rejected due to poorer usability and accessibility.

## Risks / Trade-offs

- [Risk] Long text in validation notes/reason can dominate layout. -> Mitigation: apply line wrapping, max-height policy where needed, and readable spacing.
- [Risk] Data source inconsistencies (null/undefined/non-string). -> Mitigation: normalize values before rendering with explicit placeholders.
- [Trade-off] Additional visual weight in right-side panel. -> Mitigation: use concise headings and subdued styling hierarchy.

## Migration Plan

- Implement metadata grid component/section in frontend compare layout.
- Bind ontology response fields to the four grid cells with normalization.
- Add tests for labels, values, and fallback behavior.
- Add responsive layout checks in CSS and validate in desktop/mobile viewport sizes.

## Open Questions

- Should hierarchy_assessment remain free-form text only, or include semantic status badges when values match known states?
- For very long validation notes, should content be fully expanded by default or collapsed with "show more"?
