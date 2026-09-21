import { EcgLine } from "../components/EcgLine";

const effortCards = [
  "Cada madrugada estudiando.",
  "Cada tema complicado que logras entender.",
  "Cada examen que enfrentas.",
  "Cada momento en el que decides seguir."
];

export function ExamCongratulations() {
  return (
    <section id="examenes" className="section exam-section">
      <div className="section-heading">
        <p className="eyebrow">Felicidades por tus examenes</p>
        <h2>Lo estas haciendo increible 🩺♥</h2>
        <p>Todo eso te esta acercando a la profesional que suenas ser.</p>
      </div>
      <div className="effort-grid">
        {effortCards.map((card) => <article key={card}>{card}</article>)}
      </div>
      <div className="medical-card">
        <EcgLine />
        <dl>
          <div><dt>Paciente</dt><dd>Yenni ♥</dd></div>
          <div><dt>Diagnostico</dt><dd>Una mujer increiblemente perseverante.</dd></div>
          <div><dt>Pronostico</dt><dd>Un futuro enorme.</dd></div>
          <div><dt>Tratamiento</dt><dd>Mucho amor, descanso, abrazos y seguir creyendo en ella misma.</dd></div>
          <div><dt>Medico responsable del cuidado del corazon</dt><dd>Lener ♥</dd></div>
        </dl>
      </div>
    </section>
  );
}
