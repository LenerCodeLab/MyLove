import { useState } from "react";

export function AnatomicalHeart() {
  const [message, setMessage] = useState("Toca el corazon");

  return (
    <section className="section heart-section">
      <div className="anatomical-heart" onMouseEnter={() => setMessage("Este ya tiene duena ♥")} onClick={() => setMessage("Y se llama Yenni.")}>
        <span>♥</span>
      </div>
      <h2>{message}</h2>
      <p>Late suave, pero late por ti.</p>
    </section>
  );
}
