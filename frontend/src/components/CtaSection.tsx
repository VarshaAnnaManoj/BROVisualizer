export function CtaSection() {
  return (
    <section id="launch" className="section" aria-labelledby="launch-title">
      <div className="container surface p-6 stack gap-4 cta-panel">
        <h2 id="launch-title">Ready for FastAPI integration</h2>
        <p>
          This frontend is intentionally presentation-first. Data contracts can be
          connected later without changing layout primitives or visual tokens.
        </p>
        <a className="btn btn-primary" href="#workflow">
          Continue to next phase
        </a>
      </div>
    </section>
  )
}
