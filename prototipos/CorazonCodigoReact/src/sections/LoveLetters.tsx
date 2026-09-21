import { Envelope } from "../components/Envelope";
import { content } from "../data/content";

export function LoveLetters() {
  return (
    <section id="cartas" className="section letters-section">
      <div className="section-heading">
        <p className="eyebrow">Mensajes para abrir despacito</p>
        <h2>Cartas para ti 💌</h2>
      </div>
      <div className="letters-grid">
        {content.letters.map((letter) => (
          <Envelope key={letter.id} id={letter.id} title={letter.title} body={letter.body} />
        ))}
      </div>
    </section>
  );
}
