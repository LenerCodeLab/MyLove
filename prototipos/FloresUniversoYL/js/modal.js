(function () {
  function initModal(config) {
    const modal = document.getElementById("letterModal");
    const openButton = document.getElementById("openLetter");
    const closeButton = document.getElementById("closeLetter");
    const title = document.getElementById("letterTitle");
    const text = document.getElementById("letterText");
    const signature = document.getElementById("letterSignature");

    text.textContent = config.letter;
    title.textContent = "Mi luz amarilla";
    signature.textContent = "Con amor, Lener ♥";

    function open(letter) {
      if (letter) {
        title.textContent = letter.title;
        text.textContent = letter.message;
        signature.textContent = letter.signature;
      } else {
        title.textContent = "Mi luz amarilla";
        text.textContent = config.letter;
        signature.textContent = "Con amor, Lener ♥";
      }
      modal.hidden = false;
      closeButton.focus();
    }

    function close() {
      modal.hidden = true;
      openButton.focus();
    }

    openButton.addEventListener("click", open);
    closeButton.addEventListener("click", close);
    modal.addEventListener("click", (event) => {
      if (event.target === modal) close();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !modal.hidden) close();
    });

    return { open, close };
  }

  function initMusic(config) {
    const audio = document.getElementById("music");
    const button = document.getElementById("musicToggle");
    audio.src = config.audio;
    audio.volume = 0.55;

    function sync() {
      button.classList.toggle("is-playing", !audio.paused);
      button.setAttribute("aria-label", audio.paused ? "Reproducir musica" : "Pausar musica");
    }

    function play() {
      return audio.play().then(sync).catch(sync);
    }

    function pause() {
      audio.pause();
      sync();
    }

    button.addEventListener("click", () => {
      if (audio.paused) {
        play();
      } else {
        pause();
      }
    });

    audio.addEventListener("play", sync);
    audio.addEventListener("pause", sync);
    sync();
    return { play, pause, audio };
  }

  window.FloresModal = { initModal, initMusic };
})();
