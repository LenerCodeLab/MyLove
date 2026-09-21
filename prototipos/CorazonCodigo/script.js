(function () {
  const content = window.YL_CONTENT;
  const $ = (selector) => document.querySelector(selector);

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    renderStaticContent();
    setupWelcome();
    setupMusic();
    setupGalleryModal();
    setupHeart();
    setupSecret();
    setupHiddenDetails();
    updateCounter();
    setInterval(updateCounter, 60 * 60 * 1000);
    window.YLLetters.render(content.letters);
    window.YLPuzzle.init(content.gallery);
    window.YLMemory.init();
    window.YLEffects.petals();
    window.YLEffects.revealOnScroll();
  }

  function renderStaticContent() {
    $("#heroPhotos").innerHTML = content.heroImages.map((image, index) => `<img src="${image}" alt="Recuerdo Y&L ${index + 1}" />`).join("");
    $("#examCards").innerHTML = content.examCards.map((card) => `<article>${card}</article>`).join("");
    $("#bouquet").innerHTML = Array.from({ length: 13 }, () => "<span>🌻</span>").join("");
    $("#galleryGrid").innerHTML = content.gallery.map((photo, index) => `
      <button class="polaroid" type="button" data-photo="${index}" style="--tilt:${index % 2 ? 1.8 : -1.5}deg">
        <img src="${photo.src}" alt="${photo.text}" />
        <span>${photo.emoji} ${photo.text}</span>
      </button>
    `).join("");
    $("#timelineGrid").innerHTML = content.timeline.map((item) => `
      <article>
        <span>${item.date}</span>
        <h3>${item.title}</h3>
        <p>${item.text}</p>
      </article>
    `).join("");
    $("#futureGrid").innerHTML = content.future.map((goal) => `<article>${goal}</article>`).join("");
    $("#stars").innerHTML = Array.from({ length: 36 }, () => `<i style="--x:${Math.random() * 100}%;--y:${Math.random() * 100}%"></i>`).join("");
  }

  function setupWelcome() {
    const entered = localStorage.getItem("yl.entered") === "true";
    if (entered) showMain(false);
    $("#enterButton").addEventListener("click", () => {
      localStorage.setItem("yl.entered", "true");
      showMain(true);
      playMusic();
    });
  }

  function showMain(scroll) {
    $("#welcome").hidden = true;
    $("#mainContent").hidden = false;
    $("#progressNav").classList.add("is-visible");
    if (scroll) $("#hero").scrollIntoView({ behavior: "smooth" });
  }

  function setupMusic() {
    const audio = $("#music");
    const button = $("#musicButton");
    const volume = $("#volumeControl");
    audio.volume = Number(localStorage.getItem("yl.music.volume") || "0.42");
    volume.value = String(audio.volume);
    button.textContent = localStorage.getItem("yl.music.playing") === "true" ? "♫" : "♪";
    button.addEventListener("click", () => {
      if (audio.paused) playMusic();
      else {
        audio.pause();
        button.textContent = "♪";
        localStorage.setItem("yl.music.playing", "false");
      }
    });
    volume.addEventListener("input", () => {
      audio.volume = Number(volume.value);
      localStorage.setItem("yl.music.volume", volume.value);
    });
  }

  function playMusic() {
    const audio = $("#music");
    audio.play().then(() => {
      $("#musicButton").textContent = "♫";
      localStorage.setItem("yl.music.playing", "true");
    }).catch(() => {
      $("#musicButton").textContent = "♪";
    });
  }

  function setupGalleryModal() {
    $("#galleryGrid").addEventListener("click", (event) => {
      const card = event.target.closest("[data-photo]");
      if (!card) return;
      const photo = content.gallery[Number(card.dataset.photo)];
      $("#modalImage").src = photo.src;
      $("#modalImage").alt = photo.text;
      $("#modalTitle").textContent = photo.place;
      $("#modalText").textContent = `${photo.date} - ${photo.text}`;
      $("#photoModal").hidden = false;
    });
    $("#modalClose").addEventListener("click", () => $("#photoModal").hidden = true);
    $("#photoModal").addEventListener("click", (event) => {
      if (event.target.id === "photoModal") $("#photoModal").hidden = true;
    });
  }

  function setupHeart() {
    const heart = $("#heartButton");
    const message = $("#heartMessage");
    heart.addEventListener("mouseenter", () => message.textContent = "Este ya tiene duena ♥");
    heart.addEventListener("click", () => {
      message.textContent = "Y se llama Yenni.";
      window.YLEffects.confetti(heart);
    });
  }

  function setupSecret() {
    let clicks = 0;
    const card = $("#secretCard");
    if (localStorage.getItem("yl.secret.unlocked") === "true") card.hidden = false;
    $("#secretButton").addEventListener("click", (event) => {
      clicks += 1;
      if (clicks >= 5) {
        card.hidden = false;
        localStorage.setItem("yl.secret.unlocked", "true");
        window.YLEffects.confetti(event.currentTarget);
      }
    });
  }

  function setupHiddenDetails() {
    document.querySelectorAll("[data-detail]").forEach((button) => {
      button.addEventListener("click", () => {
        $("#detailMessage").textContent = button.dataset.detail;
        window.YLEffects.confetti(button);
      });
    });
    $("#yellowButton").addEventListener("mouseenter", (event) => window.YLEffects.confetti(event.currentTarget));
    $("#yellowButton").addEventListener("click", openYellowExperience);
    $("#yellowModalClose").addEventListener("click", closeYellowExperience);
    $("#yellowReturn").addEventListener("click", closeYellowExperience);
    $("#yellowModal").addEventListener("click", (event) => {
      if (event.target.id === "yellowModal") closeYellowExperience();
    });
  }

  function openYellowExperience(event) {
    const button = event.currentTarget;
    document.body.classList.add("yellow-transition");
    window.YLEffects.confetti(button);
    window.setTimeout(() => {
      $("#yellowModal").hidden = false;
      $("#yellowModalClose").focus();
      document.body.classList.remove("yellow-transition");
      localStorage.setItem("yl.yellowFlowers.opened", "true");
    }, 260);
  }

  function closeYellowExperience() {
    $("#yellowModal").hidden = true;
    $("#yellowButton").focus();
  }

  function updateCounter() {
    const start = new Date(content.relationshipStartDate);
    const now = new Date();
    const diff = Math.max(now.getTime() - start.getTime(), 0);
    const hours = Math.floor(diff / 36e5);
    const days = Math.floor(hours / 24);
    const values = [
      [Math.floor(days / 365), "anos"],
      [Math.floor((days % 365) / 30), "meses"],
      [days % 30, "dias"],
      [hours % 24, "horas"]
    ];
    $("#counterGrid").innerHTML = values.map(([value, label]) => `<strong>${value}<span>${label}</span></strong>`).join("");
  }
})();
