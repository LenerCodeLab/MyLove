import { useEffect, useMemo, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { burstConfetti } from "../utils/confetti";

const symbols = ["♥", "🩺", "🌻", "〰", "Y", "L", "💍", "📷", "📘", "✦"];

function shuffle<T>(values: T[]) {
  return [...values].sort(() => Math.random() - 0.5);
}

export function MemoryGame() {
  const deck = useMemo(() => shuffle([...symbols, ...symbols].map((symbol, index) => ({ id: `${symbol}-${index}`, symbol }))), []);
  const [cards, setCards] = useState(deck);
  const [open, setOpen] = useState<number[]>([]);
  const [matched, setMatched] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [completed, setCompleted] = useLocalStorage("yl.memory.completed", false);

  useEffect(() => {
    const timer = window.setInterval(() => setSeconds((value) => value + 1), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (open.length !== 2) return;
    const [first, second] = open;
    setMoves((value) => value + 1);

    if (cards[first].symbol === cards[second].symbol) {
      setMatched((items) => [...items, cards[first].symbol]);
      setOpen([]);
    } else {
      window.setTimeout(() => setOpen([]), 650);
    }
  }, [open, cards]);

  useEffect(() => {
    if (matched.length === symbols.length) {
      setCompleted(true);
      burstConfetti();
    }
  }, [matched, setCompleted]);

  function reveal(index: number) {
    if (open.includes(index) || matched.includes(cards[index].symbol) || open.length === 2) return;
    setOpen((items) => [...items, index]);
  }

  function reset() {
    setCards(shuffle(deck));
    setOpen([]);
    setMatched([]);
    setMoves(0);
    setSeconds(0);
  }

  return (
    <section className="game-card">
      <div>
        <h3>Memoria de nuestro amor ♥</h3>
        <p>Nivel dulce · Movimientos: {moves} · Tiempo: {seconds}s {completed ? "· Completado" : ""}</p>
      </div>
      <button type="button" onClick={reset}>Reiniciar</button>
      <div className="memory-board">
        {cards.map((card, index) => {
          const visible = open.includes(index) || matched.includes(card.symbol);
          return (
            <button key={card.id} className={visible ? "memory-card is-open" : "memory-card"} type="button" onClick={() => reveal(index)}>
              {visible ? card.symbol : "Y&L"}
            </button>
          );
        })}
      </div>
      {matched.length === symbols.length && <strong className="game-success">Completaste la memoria, igual que guardas bonito nuestros recuerdos ♥</strong>}
    </section>
  );
}
