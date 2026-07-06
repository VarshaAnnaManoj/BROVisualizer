## Context

The Modified Ontology area currently contains section headers, diff legends, paths, and value descriptions that are no longer desired. The target experience is a minimal bubble-only navigation strip positioned directly below Change Only controls, with all descriptive difference content removed. Existing bubble click and keyboard behavior should continue to navigate and focus the same Pre/Post JSON targets.

## Goals / Non-Goals

**Goals:**
- Move bubble actions to sit directly below Change Only controls.
- Remove descriptive difference text and auxiliary Modified Ontology content.
- Preserve action ordering and existing navigation semantics.
- Keep the bubble strip usable across desktop and responsive widths.

**Non-Goals:**
- No backend changes to diff payloads or API contracts.
- No changes to how diffs are computed.
- No additions of new content panels in place of removed Modified Ontology details.

## Decisions

1. Replace detailed Modified Ontology body with a compact bubble strip.
- Decision: Render only indexed bubble controls in the Modified Ontology panel body and remove path/value labels and section headings.
- Rationale: Directly matches request to remove descriptions and keep only bubbles.
- Alternative considered: Keep hidden text for visual users and only show on hover. Rejected because request is explicit about no descriptions.

2. Position bubble strip immediately under existing Change Only controls.
- Decision: Reuse current panel layout and place the bubble strip as the first content block below viewer mode controls.
- Rationale: Keeps interaction location predictable and satisfies placement requirement.
- Alternative considered: Move bubbles into each Pre/Post pane. Rejected because request targets Modified Ontology area.

3. Preserve semantic button accessibility and active/focus states.
- Decision: Keep bubbles as button elements with existing aria labels and state classes.
- Rationale: Minimizes regression risk and keeps keyboard/screen reader behavior intact.
- Alternative considered: non-button decorative bubbles. Rejected due to accessibility and functionality loss.

## Risks / Trade-offs

- [Risk] Removing textual context may make bubble purpose less obvious. -> Mitigation: retain accessible labels and ordered layout.
- [Risk] Dense bubble rows may wrap awkwardly on small screens. -> Mitigation: add responsive wrapping and spacing rules.
- [Risk] Removing section content can break existing tests. -> Mitigation: update tests to assert bubble-only rendering and preserved navigation.

## Migration Plan

- Update Modified Ontology render structure to remove descriptive sections and display only bubble action strip.
- Adjust CSS for placement directly below Change Only controls and responsive wrapping.
- Update tests for placement, absence of descriptive content, and retained behavior.
- Validate via frontend tests and build.

## Open Questions

- Should bubble numbering reset by action category or remain globally sequential in display order?
- Should a placeholder message appear when there are zero diff actions, or should the area remain empty?
