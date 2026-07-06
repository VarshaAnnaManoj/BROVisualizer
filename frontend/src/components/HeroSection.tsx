export function HeroSection() {
  return (
    <section className="section" aria-labelledby="hero-title">
      <div className="container surface p-6 stack gap-4 hero-section">
        <p className="eyebrow">BRO Visualizer</p>
        <h1 id="hero-title">Design-first frontend foundation</h1>
        <p className="hero-copy">
          React and TypeScript layout baseline aligned for a Figma-first workflow,
          with reusable tokens and responsive primitives ready for scale.
        </p>
        <div className="row gap-4 hero-actions">
          <button type="button" className="btn btn-primary">
            Start building
          </button>
          <button type="button" className="btn btn-secondary">
            View structure
          </button>
        </div>
      </div>
    </section>
  )
}
