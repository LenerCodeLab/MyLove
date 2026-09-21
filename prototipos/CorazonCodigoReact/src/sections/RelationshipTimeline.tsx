import { content } from "../data/content";

export function RelationshipTimeline() {
  return (
    <section className="section timeline-section">
      <div className="section-heading">
        <p className="eyebrow">Editable en content.ts</p>
        <h2>Nuestra historia</h2>
      </div>
      <div className="storyline">
        {content.timeline.map((item) => (
          <article key={item.title}>
            <span>{item.date}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
