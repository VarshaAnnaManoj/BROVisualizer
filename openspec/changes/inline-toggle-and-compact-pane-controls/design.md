## Context

The pane controls currently allow `Change Only` and `Complete JSON` to wrap onto separate lines in constrained widths, making controls look broken and wasting vertical space. Users also requested compact input widths and stronger suppression of `Pasted Image` noise in displayed content.

## Goals / Non-Goals

**Goals:**
- Keep `Change Only` and `Complete JSON` controls on one horizontal row per pane.
- Reduce ID/version and related pane control widths for a tighter control strip.
- Ensure `Pasted Image` placeholders do not appear in pane-visible content.
- Preserve responsive usability across desktop and smaller breakpoints.

**Non-Goals:**
- No backend API contract changes.
- No changes to diff algorithms beyond display/cleanup behavior.
- No full redesign of the compare panel architecture.

## Decisions

1. Enforce inline toggle row.
- Decision: Use a no-wrap or controlled-wrap layout with compact button sizing so both toggle options remain in one row on standard desktop widths.
- Rationale: Satisfies direct UX request and improves visual consistency.
- Alternative considered: split controls into stacked pills. Rejected because request explicitly wants same-line behavior.

2. Compact pane input controls.
- Decision: Reduce form input/button widths and gaps while preserving click/focus accessibility.
- Rationale: Improves density and gives more room to pane content.
- Alternative considered: hiding secondary controls. Rejected due to loss of explicit retry/load actions.

3. Strengthen placeholder suppression.
- Decision: Continue and harden suppression path for `Pasted Image` placeholder strings so they are never surfaced in pane output.
- Rationale: Removes noisy artifacts from user-facing content.
- Alternative considered: visual de-emphasis only. Rejected because user asked for removal.

## Risks / Trade-offs

- [Risk] Overly compact controls can hurt readability/clickability. -> Mitigation: keep minimum hit area and focus-visible styles.
- [Risk] Strict inline layout may overflow in narrower widths. -> Mitigation: responsive breakpoint rules with graceful fallback.
- [Trade-off] Smaller input controls can reduce perceived affordance. -> Mitigation: maintain contrast and button hierarchy.

## Migration Plan

- Update pane header CSS/structure for inline toggle behavior.
- Tighten pane input control dimensions and spacing.
- Verify placeholder suppression path in render pipeline.
- Add tests for inline controls and suppression behavior, then run frontend test/build.

## Open Questions

- Should inline toggle remain strictly one line at all desktop widths, or only above a defined width threshold?
- Should compact sizing be applied uniformly to both Pre and Post panes or allow per-pane overrides?
