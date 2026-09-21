(function () {
  window.YLEffects = {
    confetti(origin) {
      const rect = origin && origin.getBoundingClientRect ? origin.getBoundingClientRect() : null;
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
    },
    petals() {
      const layer = document.getElementById("petalLayer");
      if (!layer) return;
      for (let index = 0; index < 24; index += 1) {
        const petal = document.createElement("span");
        petal.className = "petal";
        petal.textContent = index % 4 === 0 ? "♥" : "✿";
        petal.style.left = `${Math.random() * 100}%`;
        petal.style.animationDuration = `${12 + Math.random() * 10}s`;
        petal.style.animationDelay = `${Math.random() * -12}s`;
        petal.style.fontSize = `${12 + Math.random() * 12}px`;
        layer.appendChild(petal);
      }
    },
    revealOnScroll() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      }, { threshold: 0.12 });
      document.querySelectorAll(".section").forEach((section) => observer.observe(section));
    }
  };
})();
