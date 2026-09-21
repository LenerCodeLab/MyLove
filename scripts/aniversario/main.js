const memories = [
  {
    block: "Primer mes",
    date: "El comienzo",
    image: "../../img/Amor1.jpeg",
    title: "Nuestro primer recuerdo",
    caption: "Uno de mis recuerdos favoritos",
    shortText: "Ese inicio bonito donde todo empezo a sentirse diferente.",
    letter: "Gracias por llegar de una forma tan inesperada y convertir momentos sencillos en recuerdos que hoy guardo con todo mi corazon."
  },
  {
    block: "Primer mes",
    date: "Un momento para sonreir",
    image: "../../img/Amor2.jpeg",
    title: "Risas que se quedaron",
    caption: "Tu sonrisa hizo especial este dia",
    shortText: "Cada conversacion, cada broma y cada mirada fue sumando algo hermoso.",
    letter: "Me encanta pensar en como poco a poco nos fuimos eligiendo, incluso en esos detalles pequenos que parecen simples pero significan tanto."
  },
  {
    block: "Primer mes",
    date: "Nuestro picnic",
    image: "../../img/Picnic1.jpeg",
    title: "Un dia para recordar",
    caption: "Un pedacito de paz contigo",
    shortText: "Hay dias que se quedan guardados como si fueran una foto del alma.",
    letter: "Ese momento me recordo que contigo lo cotidiano puede sentirse especial, suave y lleno de calma."
  },
  {
    block: "Primer mes",
    date: "Pequenos detalles",
    image: "../../img/Picnic2.jpeg",
    title: "Detalles que enamoran",
    caption: "Otro recuerdo que abrazo fuerte",
    shortText: "Seguimos creando motivos para sonreir al mirar atras.",
    letter: "Gracias por tu forma de ser, por tus ocurrencias, por tu ternura y por hacer que esta historia tenga colores tan bonitos."
  },
  {
    block: "Primer mes",
    date: "Lo bonito de estos dias",
    image: "../../img/Amor3.jpeg",
    title: "Lo que estamos construyendo",
    caption: "Mi lugar bonito",
    shortText: "Este primer mes nos regalo motivos para aprender, cuidar y celebrar.",
    letter: "Quiero que sigamos creciendo con paciencia, respeto y carino, cuidando esto que sentimos como algo valioso."
  }
];

const timeline = document.querySelector("#timeline");
const startButton = document.querySelector("#startButton");
const cover = document.querySelector("#cover");
const story = document.querySelector("#story");
const music = document.querySelector("#music");
const musicButton = document.querySelector("#musicButton");
const progressFill = document.querySelector("#progressFill");
const petalLayer = document.querySelector(".petal-layer");

let musicStarted = false;

renderMemories();
createPetals();
bindStart();
bindMusic();
bindFinalLetter();
observeMemories();
updateProgress();

function renderMemories() {
  const markup = memories.map((memory, index) => {
    const tilt = index % 2 === 0 ? "-1.5deg" : "1.25deg";

    return `
      <section class="memory" style="--tilt: ${tilt}">
        <figure class="photo-card">
          <img src="${memory.image}" alt="${memory.title}" loading="lazy" />
          <figcaption>${memory.caption}</figcaption>
        </figure>

        <div class="memory__content">
          <p class="memory__date">${memory.block} - ${memory.date}</p>
          <h3>${memory.title}</h3>
          <p class="memory__text">${memory.shortText}</p>
          <button class="memory-heart" type="button" aria-label="Mostrar frase sorpresa">♥</button>

          <div class="envelope-wrap">
            <button class="envelope" type="button" aria-expanded="false">
              <span class="envelope__flap"></span>
              <span class="envelope__heart">♥</span>
              <span class="envelope__label">Abrir carta</span>
            </button>
            <article class="letter" aria-hidden="true">
              <p class="letter__kicker">${memory.block}</p>
              <h4>${memory.title}</h4>
              <p>${memory.letter}</p>
            </article>
          </div>
        </div>
      </section>
    `;
  }).join("");

  timeline.innerHTML = markup;
  timeline.querySelectorAll(".envelope").forEach((button) => {
    button.addEventListener("click", () => openEnvelope(button.closest(".envelope-wrap"), button));
  });
  timeline.querySelectorAll(".memory-heart").forEach((button) => {
    button.addEventListener("click", (event) => showFloatingNote(event, "Este recuerdo vive en mi corazon ♥"));
  });
}

function bindStart() {
  startButton.addEventListener("click", async () => {
    cover.style.display = "none";
    story.classList.add("is-visible");
    await startMusic();
    story.scrollIntoView({ behavior: "smooth" });
  });
}

function bindMusic() {
  music.volume = 0.42;
  musicButton.addEventListener("click", async () => {
    if (!musicStarted || music.paused) {
      await startMusic();
    } else {
      music.pause();
      musicButton.textContent = "♪";
      musicButton.setAttribute("aria-label", "Reproducir musica");
    }
  });
}

async function startMusic() {
  try {
    await music.play();
    musicStarted = true;
    musicButton.textContent = "♫";
    musicButton.setAttribute("aria-label", "Pausar musica");
  } catch {
    musicButton.textContent = "♪";
  }
}

function bindFinalLetter() {
  const finalWrap = document.querySelector("[data-final-envelope]");
  const finalButton = finalWrap.querySelector(".envelope");
  finalButton.addEventListener("click", () => openEnvelope(finalWrap, finalButton, true));
}

function openEnvelope(wrapper, button, isFinal = false) {
  const isOpen = wrapper.classList.toggle("is-open");
  const letter = wrapper.querySelector(".letter");
  button.setAttribute("aria-expanded", String(isOpen));
  letter.setAttribute("aria-hidden", String(!isOpen));

  if (isOpen) {
    createBurst(button, isFinal ? 14 : 7);
  }
}

function createBurst(source, count) {
  const rect = source.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  for (let index = 0; index < count; index += 1) {
    const particle = document.createElement("span");
    particle.className = "burst";
    particle.textContent = index % 3 === 0 ? "✦" : "♥";
    particle.style.left = `${centerX}px`;
    particle.style.top = `${centerY}px`;
    particle.style.setProperty("--x", `${Math.cos(index) * (35 + index * 4)}px`);
    particle.style.setProperty("--y", `${Math.sin(index * 1.4) * (32 + index * 3)}px`);
    document.body.appendChild(particle);
    particle.addEventListener("animationend", () => particle.remove());
  }
}

function showFloatingNote(event, text) {
  const note = document.createElement("div");
  note.className = "floating-note";
  note.textContent = text;
  note.style.left = `${Math.min(event.clientX, window.innerWidth - 240)}px`;
  note.style.top = `${Math.max(event.clientY - 54, 18)}px`;
  document.body.appendChild(note);
  note.addEventListener("animationend", () => note.remove());
}

function observeMemories() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  }, { threshold: 0.24 });

  document.querySelectorAll(".memory, .final-card-section").forEach((element) => observer.observe(element));
}

function createPetals() {
  for (let index = 0; index < 20; index += 1) {
    const petal = document.createElement("span");
    petal.className = "petal";
    petal.textContent = index % 4 === 0 ? "♥" : "✿";
    petal.style.left = `${Math.random() * 100}%`;
    petal.style.animationDuration = `${12 + Math.random() * 10}s`;
    petal.style.animationDelay = `${Math.random() * -12}s`;
    petal.style.fontSize = `${12 + Math.random() * 12}px`;
    petalLayer.appendChild(petal);
  }
}

function updateProgress() {
  const update = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const verticalProgress = scrollable > 0 ? window.scrollY / scrollable : 0;
    const horizontalProgress = timeline.scrollWidth > timeline.clientWidth
      ? timeline.scrollLeft / (timeline.scrollWidth - timeline.clientWidth)
      : 0;
    const progress = Math.max(verticalProgress, horizontalProgress);
    progressFill.style.width = `${Math.min(progress * 100, 100)}%`;
  };

  window.addEventListener("scroll", update, { passive: true });
  timeline.addEventListener("scroll", update, { passive: true });
  update();
}
