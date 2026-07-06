# Component Map and Integration Boundaries

## Screen Composition

- `App.tsx`: Page shell and section ordering.
- `components/Header.tsx`: Primary navigation links.
- `components/HeroSection.tsx`: Top headline, summary copy, and action buttons.
- `components/HighlightsSection.tsx`: Reusable feature card grid.
- `components/CtaSection.tsx`: Final call-to-action panel.

## Styling Layers

- `styles/tokens.css`: Source of truth for color, typography, spacing, radius, shadow, and breakpoints.
- `styles/layout.css`: Reusable layout primitives (`container`, `section`, `row`, `stack`) and spacing utilities.
- `App.css`: Feature-level visual styling and interaction states.
- `index.css`: Minimal global root setup.

## FastAPI Integration Boundaries

The current UI is presentational and data-agnostic. To integrate FastAPI in the next phase:

1. Add a data adapter layer (for example `src/api/`) with typed fetch functions.
2. Pass API data into section components through props rather than embedding fetch logic in UI components.
3. Keep design tokens and layout primitives unchanged so data integration does not affect visual system contracts.
4. Introduce loading, empty, and error states at section level without changing component responsibilities.
