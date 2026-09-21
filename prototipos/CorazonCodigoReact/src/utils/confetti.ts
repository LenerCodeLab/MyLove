export function burstConfetti(origin?: HTMLElement | null) {
  const rect = origin?.getBoundingClientRect();
  const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
  const y = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;

  for (let index = 0; index < 18; index += 1) {
    const particle = document.createElement("span");
    particle.className = "confetti-particle";
    particle.textContent = index % 3 === 0 ? "♥" : index % 3 === 1 ? "✦" : "🌻";
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.setProperty("--x", `${Math.cos(index) * (50 + index * 3)}px`);
    particle.style.setProperty("--y", `${Math.sin(index * 1.7) * (44 + index * 2)}px`);
    document.body.appendChild(particle);
    particle.addEventListener("animationend", () => particle.remove());
  }
}
