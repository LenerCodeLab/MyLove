import { MemoryGame } from "../games/MemoryGame";
import { PuzzleGame } from "../games/PuzzleGame";

export function GamesSection() {
  return (
    <section id="juegos" className="section games-section">
      <div className="section-heading">
        <p className="eyebrow">Mini juegos</p>
        <h2>Jugar tambien es recordar</h2>
      </div>
      <div className="games-grid">
        <PuzzleGame />
        <MemoryGame />
      </div>
    </section>
  );
}
