import type { MouseEvent } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { burstConfetti } from "../utils/confetti";

type Props = {
  id: string;
  title: string;
  body: string;
};

export function Envelope({ id, title, body }: Props) {
  const [opened, setOpened] = useLocalStorage(`yl.letter.${id}`, false);

  function toggle(event: MouseEvent<HTMLButtonElement>) {
    const next = !opened;
    setOpened(next);
    if (next) burstConfetti(event.currentTarget);
  }

  return (
    <article className={`letter-envelope ${opened ? "is-open" : ""}`}>
      <button type="button" onClick={toggle} aria-expanded={opened}>
        <span className="flap" />
        <span className="seal">♥</span>
        <strong>{title}</strong>
      </button>
      <div className="letter-paper" aria-hidden={!opened}>
        <h4>{title}</h4>
        <p>{body}</p>
      </div>
    </article>
  );
}
