import { relationshipStartDate } from "../data/content";
import { relationshipDuration } from "../utils/date";

export function RelationshipCounter() {
  const duration = relationshipDuration(relationshipStartDate);

  return (
    <section className="section counter-section">
      <p className="eyebrow">Configurable</p>
      <h2>Llevamos...</h2>
      <div className="counter-grid">
        <strong>{duration.years}<span>anos</span></strong>
        <strong>{duration.months}<span>meses</span></strong>
        <strong>{duration.days}<span>dias</span></strong>
        <strong>{duration.hours}<span>horas</span></strong>
      </div>
      <p>Y todavia siento que esto recien empieza.</p>
    </section>
  );
}
