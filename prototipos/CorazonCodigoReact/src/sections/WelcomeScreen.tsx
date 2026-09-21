import { EcgLine } from "../components/EcgLine";
import { content } from "../data/content";

type Props = {
  onEnter: () => void;
};

export function WelcomeScreen({ onEnter }: Props) {
  return (
    <section className="welcome-screen">
      <div className="welcome-card">
        <p className="eyebrow">Para mi persona favorita...</p>
        <h1>{content.names.her} ♥</h1>
        <EcgLine />
        <p>He preparado algo para recordarte lo orgulloso que estoy de ti.</p>
        <button className="primary-button" type="button" onClick={onEnter}>
          Entrar a nuestro pequeno mundo ♥
        </button>
      </div>
    </section>
  );
}
