import { content } from "../data/content";

export function HeroSection() {
  return (
    <section id="hero" className="hero section">
      <div className="hero-copy">
        <p className="eyebrow">{content.projectName}</p>
        <h2>Estoy muy orgulloso de ti, {content.names.her} ♥</h2>
        <p>
          Se cuanto esfuerzo, tiempo, cansancio y dedicacion hay detras de cada examen. Independientemente de cualquier
          nota, quiero que recuerdes algo: admiro muchisimo todo lo que haces para acercarte a tus suenos.
        </p>
        <blockquote>
          Algun dia seras una gran doctora, pero desde hace mucho tiempo ya eres la doctora favorita de mi corazon.
        </blockquote>
        <strong>Con todo mi amor,<br />{content.names.him} ♥</strong>
      </div>
      <div className="hero-photos" aria-label="Fotografias principales">
        {content.heroImages.map((image, index) => (
          <img key={image} src={image} alt={`Recuerdo Y&L ${index + 1}`} />
        ))}
      </div>
    </section>
  );
}
