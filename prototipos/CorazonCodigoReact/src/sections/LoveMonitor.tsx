import { EcgLine } from "../components/EcgLine";

export function LoveMonitor() {
  return (
    <section className="section monitor-section">
      <div className="monitor">
        <h2>Analizando signos vitales del corazon...</h2>
        <EcgLine />
        <div className="vitals-grid">
          <article><span>Frecuencia cardiaca</span><strong>Aumenta cuando Yenni aparece</strong></article>
          <article><span>Saturacion de amor</span><strong>100%</strong></article>
          <article><span>Compatibilidad Y + L</span><strong>∞</strong></article>
          <article><span>Diagnostico final</span><strong>Enamorado de Yenni de forma irreversible.</strong></article>
          <article><span>Tratamiento</span><strong>Pasar toda la vida juntos.</strong></article>
        </div>
      </div>
    </section>
  );
}
