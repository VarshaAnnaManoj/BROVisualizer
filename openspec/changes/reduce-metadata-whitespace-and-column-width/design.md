## Context

The current metadata panel has excessive unused shaded area and overly wide column cards, making the right side of the compare screen look sparse. Users requested tighter use of this area with narrower metadata columns and a denser layout while preserving readability.

## Goals / Non-Goals

**Goals:**
- Reduce visible white/empty area in the metadata panel region.
- Decrease metadata column width and tighten internal spacing for better information density.
- Maintain readability for long text fields via wrapping and stable card sizing.
- Preserve current compare functionality and metadata field content behavior.

**Non-Goals:**
- No backend API changes.
- No modifications to diff-generation algorithms.
- No redesign of non-metadata sections beyond layout balancing adjustments.

## Decisions

1. Narrower metadata columns with denser card spacing.
- Decision: Constrain metadata column/card width and reduce panel padding/gaps to use shaded area more effectively.
- Rationale: Eliminates sparse appearance and improves scan density.
- Alternative considered: increase font size/content verbosity. Rejected because it does not solve structural whitespace.

2. Rebalance analysis grid width allocation.
- Decision: Adjust analysis grid proportions so metadata pane is narrower and compare pane uses more horizontal space where appropriate.
- Rationale: Better aligns visual priority and reduces empty right-side area.
- Alternative considered: fixed pixel panel widths only. Rejected due to poorer behavior across different viewport sizes.

3. Preserve text readability with strict wrapping rules.
- Decision: Keep `overflow-wrap`/`word-break` policies and allow card height expansion for long notes.
- Rationale: Compact width should not clip critical metadata text.
- Alternative considered: ellipsis truncation. Rejected due to potential loss of important review context.

## Risks / Trade-offs

- [Risk] Over-compression can make text feel cramped. -> Mitigation: tune spacing/line-height and maintain clear labels.
- [Risk] Narrower columns can increase vertical scroll for long fields. -> Mitigation: balance width reduction with improved wrapping and compact typography.
- [Trade-off] Denser layout reduces visual breathing room. -> Mitigation: retain subtle borders and hierarchy for readability.

## Migration Plan

- Update metadata panel CSS/grid sizing and spacing values.
- Re-validate desktop/tablet/mobile layout behavior.
- Update/add tests for panel presence and expected structural density cues.
- Verify build/tests and adjust if visual regressions appear.

## Open Questions

- Should we set a maximum metadata panel width cap per large monitors to avoid sparse stretching?
- Should the metadata card min-height be reduced uniformly or vary by field type?
