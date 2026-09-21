import type { MouseEvent } from "react";
import { useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { burstConfetti } from "../utils/confetti";

export function SecretMessage() {
  const [clicks, setClicks] = useState(0);
  const [unlocked, setUnlocked] = useLocalStorage("yl.secret.unlocked", false);

  function tryUnlock(event: MouseEvent<HTMLButtonElement>) {
    const next = clicks + 1;
    setClicks(next);
    if (next >= 5) {
      setUnlocked(true);
      burstConfetti(event.currentTarget);
    }
  }

  return (
    <section className="section secret-section">
      <button className="secret-trigger" type="button" onClick={tryUnlock}>Y + L</button>
      {unlocked && (
        <article className="secret-card">
          <p className="eyebrow">Encontraste mi secreto...</p>
          <h2>Pero en realidad nunca fue secreto.</h2>
          <p>Quiero una vida contigo.</p>
          <strong>Lener ♥</strong>
        </article>
      )}
    </section>
  );
}
