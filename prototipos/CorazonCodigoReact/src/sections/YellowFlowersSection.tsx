import { burstConfetti } from "../utils/confetti";

export function YellowFlowersSection() {
  return (
    <section id="flores" className="section yellow-flowers">
      <div className="flower-card">
        <p className="eyebrow">21 de septiembre</p>
        <h2>Para ti, Yenni 🌻</h2>
        <p>Porque el 21 no queria regalarte solamente flores...</p>
        <p>Queria regalarte un pequeno lugar donde pudieras recordar cuanto te amo.</p>
        <div className="digital-bouquet" aria-hidden="true">
          {Array.from({ length: 13 }, (_, index) => <span key={index}>🌻</span>)}
        </div>
        <blockquote>
          Las flores algun dia pueden marchitarse, pero espero que cada vez que regreses aqui recuerdes lo importante que
          eres para mi.
        </blockquote>
        <strong>Lener ♥</strong>
        <button className="flower-button" type="button" onMouseEnter={(event) => burstConfetti(event.currentTarget)}>
          🌻 Tengo algo amarillo para ti 🌻
        </button>
      </div>
    </section>
  );
}
