const cards = [
  {
    title: 'Tokenized UI System',
    body: 'Color, spacing, radius, shadow, and typography scales are centralized for consistency.',
  },
  {
    title: 'Responsive By Default',
    body: 'Container, row, and stack primitives adapt from desktop to tablet and mobile breakpoints.',
  },
  {
    title: 'Accessible Interactions',
    body: 'Visible focus states and semantic landmarks ensure keyboard-first navigation support.',
  },
]

export function HighlightsSection() {
  return (
    <section id="features" className="section" aria-labelledby="features-title">
      <div className="container stack gap-6">
        <h2 id="features-title">Core capabilities</h2>
        <div className="row gap-6 feature-grid" role="list" aria-label="Feature highlights">
          {cards.map((card) => (
            <article key={card.title} className="surface p-6 feature-card" role="listitem">
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
