import { useState } from "react";

const details = [
  ["🩺", "Escuchando... Solo se escucha: Yenni... Yenni... Yenni..."],
  ["💊", "Dosis recomendada: 1 abrazo de Yenni cada 8 horas."],
  ["🌻", "Efecto secundario: sonreir pensando en ti."]
];

export function HiddenDetails() {
  const [message, setMessage] = useState("Toca un detalle pequeno");

  return (
    <section className="section hidden-details">
      <p className="eyebrow">Detalles ocultos</p>
      <h2>Pequenas dosis de amor</h2>
      <div className="detail-buttons">
        {details.map(([icon, text]) => (
          <button key={icon} type="button" onClick={() => setMessage(text)}>{icon}</button>
        ))}
      </div>
      <p>{message}</p>
    </section>
  );
}
