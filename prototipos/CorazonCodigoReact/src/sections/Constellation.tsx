import type { CSSProperties } from "react";

export function Constellation() {
  return (
    <section className="section constellation">
      <div className="stars" aria-hidden="true">
        {Array.from({ length: 36 }, (_, index) => <i key={index} style={{ "--x": `${Math.random() * 100}%`, "--y": `${Math.random() * 100}%` } as CSSProperties} />)}
      </div>
      <h2>Y ♥ L</h2>
      <p>Entre millones de personas, tuve la suerte de encontrarte.</p>
    </section>
  );
}
