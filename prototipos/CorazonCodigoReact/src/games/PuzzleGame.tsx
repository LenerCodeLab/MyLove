import type { CSSProperties } from "react";
import { useEffect, useMemo, useState } from "react";
import { content } from "../data/content";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { burstConfetti } from "../utils/confetti";

const successMessages = [
  "Lo lograste! Igual que siempre logras todo lo que te propones ♥",
  "Una imagen completa, como nosotros ♥",
  "Premio: un beso de Lener 😘",
  "Diagnostico: excelente memoria visual, doctora ♥"
];

function shuffle(values: number[]) {
  return [...values].sort(() => Math.random() - 0.5);
}

export function PuzzleGame() {
  const [image, setImage] = useState(content.gallery[0].src);
  const [size, setSize] = useState(3);
  const solved = useMemo(() => Array.from({ length: size * size }, (_, index) => index), [size]);
  const [tiles, setTiles] = useState(() => shuffle(solved));
  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [completed, setCompleted] = useLocalStorage("yl.puzzle.completed", false);
  const isSolved = tiles.every((tile, index) => tile === index);

  useEffect(() => {
    const timer = window.setInterval(() => setSeconds((value) => value + 1), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    reset();
  }, [size, image]);

  useEffect(() => {
    if (isSolved && moves > 0) {
      setCompleted(true);
      burstConfetti();
    }
  }, [isSolved, moves, setCompleted]);

  function reset() {
    setTiles(shuffle(solved));
    setMoves(0);
    setSeconds(0);
  }

  function swap(from: number, to: number) {
    setTiles((current) => {
      const next = [...current];
      [next[from], next[to]] = [next[to], next[from]];
      return next;
    });
    setMoves((value) => value + 1);
  }

  return (
    <section className="game-card">
      <div>
        <h3>Arma nuestros recuerdos 🧩♥</h3>
        <p>Movimientos: {moves} · Tiempo: {seconds}s {completed ? "· Completado" : ""}</p>
      </div>
      <div className="game-controls">
        <select value={image} onChange={(event) => setImage(event.target.value)} aria-label="Elegir foto">
          {content.gallery.map((photo) => <option key={photo.src} value={photo.src}>{photo.date}</option>)}
        </select>
        <select value={size} onChange={(event) => setSize(Number(event.target.value))} aria-label="Dificultad">
          <option value={3}>Facil 3 x 3</option>
          <option value={4}>Medio 4 x 4</option>
          <option value={5}>Dificil 5 x 5</option>
          <option value={6}>Opcional 6 x 6</option>
        </select>
        <button type="button" onClick={reset}>Reiniciar</button>
      </div>
      <div className="puzzle-board" style={{ "--grid": size } as CSSProperties}>
        {tiles.map((tile, index) => {
          const x = tile % size;
          const y = Math.floor(tile / size);
          return (
            <button
              key={`${tile}-${index}`}
              type="button"
              draggable
              onDragStart={(event) => event.dataTransfer.setData("text/plain", String(index))}
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => swap(Number(event.dataTransfer.getData("text/plain")), index)}
              onClick={() => index > 0 && swap(index, index - 1)}
              className="puzzle-tile"
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: `${size * 100}% ${size * 100}%`,
                backgroundPosition: `${(x / (size - 1)) * 100}% ${(y / (size - 1)) * 100}%`
              }}
              aria-label={`Pieza ${index + 1}`}
            />
          );
        })}
      </div>
      {isSolved && moves > 0 && <strong className="game-success">{successMessages[moves % successMessages.length]}</strong>}
    </section>
  );
}
