(function () {
  function createParticles(canvas) {
    const ctx = canvas.getContext("2d", { alpha: true });
    const state = { width: 0, height: 0, dpr: 1, particles: [], pointer: { x: 0, y: 0 } };

    function resize() {
      state.dpr = Math.min(window.devicePixelRatio || 1, 2);
      state.width = window.innerWidth;
      state.height = window.innerHeight;
      canvas.width = Math.floor(state.width * state.dpr);
      canvas.height = Math.floor(state.height * state.dpr);
      canvas.style.width = `${state.width}px`;
      canvas.style.height = `${state.height}px`;
      ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);
      seed();
    }

    function seed() {
      const count = state.width < 720 ? 90 : 160;
      state.particles = Array.from({ length: count }, () => ({
        x: Math.random() * state.width,
        y: Math.random() * state.height,
        z: Math.random(),
        r: 0.7 + Math.random() * 2.4,
        a: 0.18 + Math.random() * 0.72,
        speed: 0.08 + Math.random() * 0.42,
        drift: -0.18 + Math.random() * 0.36
      }));
    }

    function setPointer(pointer) {
      state.pointer = pointer;
    }

    function frame() {
      ctx.clearRect(0, 0, state.width, state.height);
      for (const p of state.particles) {
        p.y -= p.speed * (0.6 + p.z);
        p.x += p.drift + state.pointer.x * (0.08 + p.z * 0.08);
        if (p.y < -12) p.y = state.height + 12;
        if (p.x < -12) p.x = state.width + 12;
        if (p.x > state.width + 12) p.x = -12;

        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * (4 + p.z * 5));
        glow.addColorStop(0, `rgba(255, 247, 194, ${p.a})`);
        glow.addColorStop(0.42, `rgba(255, 204, 62, ${p.a * 0.44})`);
        glow.addColorStop(1, "rgba(255, 204, 62, 0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * (4 + p.z * 5), 0, Math.PI * 2);
        ctx.fill();
      }
    }

    window.addEventListener("resize", resize);
    resize();
    return { frame, setPointer };
  }

  window.FloresParticles = { createParticles };
})();
