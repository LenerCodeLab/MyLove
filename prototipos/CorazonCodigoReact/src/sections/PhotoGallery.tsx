import type { CSSProperties } from "react";
import { useState } from "react";
import { Modal } from "../components/Modal";
import { content } from "../data/content";

export function PhotoGallery() {
  const [selected, setSelected] = useState<(typeof content.gallery)[number] | null>(null);

  return (
    <section id="galeria" className="section gallery-section">
      <div className="section-heading">
        <p className="eyebrow">Album Y&L</p>
        <h2>Pequenos momentos, grandes recuerdos ♥</h2>
      </div>
      <div className="gallery-grid">
        {content.gallery.map((photo, index) => (
          <button className="polaroid" key={photo.src} type="button" onClick={() => setSelected(photo)} style={{ "--tilt": `${index % 2 ? 1.8 : -1.5}deg` } as CSSProperties}>
            <img src={photo.src} alt={photo.text} />
            <span>{photo.emoji} {photo.text}</span>
          </button>
        ))}
      </div>
      <Modal open={Boolean(selected)} onClose={() => setSelected(null)}>
        {selected && (
          <>
            <img className="modal-image" src={selected.src} alt={selected.text} />
            <h3>{selected.place}</h3>
            <p>{selected.date} · {selected.text}</p>
          </>
        )}
      </Modal>
    </section>
  );
}
