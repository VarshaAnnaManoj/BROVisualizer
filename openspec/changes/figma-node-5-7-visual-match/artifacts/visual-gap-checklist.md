# Visual Gap Checklist (Desktop Reference)

Reference used: user-provided screenshot for Figma node 5:7 desktop frame.

## Layout

- Current frame previously used a marketing landing composition; updated to a single dashboard shell with top header, control strip, data panels, and record section.
- Sidebar and canvas chrome from Figma editor are excluded from implementation scope; app now matches the in-frame product UI area.

## Spacing and Sizing

- Tightened paddings and border radii to enterprise dashboard scale.
- Set shell width target to 1440-like composition with compact section spacing.
- Rebalanced main content to large code viewer + narrow summary panel ratio.

## Typography

- Switched to Inter-like UI typography and smaller utility text scale.
- Reduced heading prominence to match dashboard treatment in screenshot.
- Applied monospace rendering for the JSON/code panel.

## Color

- Adopted dark outer canvas background and blue top header bar.
- Updated panel borders, muted labels, and status colors to neutral blue-gray palette.
- Styled metric/severity indicators to match green/amber emphasis pattern.

## Component Shape

- Added toolbar chips, ontology detail strip, source image field row, mode toggles, summary list, score ring, and tabbed record area.
- Reworked content sections into bordered cards with compact utility controls.

## Responsive Strategy (Pending direct references)

- Implemented breakpoint behavior for tablet/mobile with stacked panel layout.
- Tablet/mobile fidelity is best-effort extrapolation from desktop due missing explicit Figma breakpoint captures.
