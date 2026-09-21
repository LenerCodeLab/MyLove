import { content } from "../data/content";

export function FutureTogether() {
  return (
    <section className="section future-section">
      <div className="section-heading">
        <p className="eyebrow">Nuestro futuro</p>
        <h2>Todo lo que sueno vivir contigo</h2>
      </div>
      <div className="future-grid">
        {content.future.map((goal) => <article key={goal}>{goal}</article>)}
      </div>
    </section>
  );
}
