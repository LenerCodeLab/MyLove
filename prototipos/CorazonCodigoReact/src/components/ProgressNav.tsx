const anchors = [
  ["Inicio", "hero"],
  ["Examenes", "examenes"],
  ["Flores", "flores"],
  ["Recuerdos", "galeria"],
  ["Cartas", "cartas"],
  ["Juegos", "juegos"],
  ["Final", "final"]
];

export function ProgressNav() {
  return (
    <nav className="progress-nav" aria-label="Navegacion principal">
      {anchors.map(([label, id]) => (
        <a key={id} href={`#${id}`}>{label}</a>
      ))}
    </nav>
  );
}
