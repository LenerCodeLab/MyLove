(function () {
  window.YLLetters = {
    render(letters) {
      const grid = document.getElementById("lettersGrid");
      if (!grid) return;
      grid.innerHTML = letters.map((letter) => {
        const opened = localStorage.getItem(`yl.letter.${letter.id}`) === "true";
        return `
          <article class="letter-envelope ${opened ? "is-open" : ""}" data-letter="${letter.id}">
            <button type="button" aria-expanded="${opened}">
              <span class="flap"></span>
              <span class="seal">♥</span>
              <strong>${letter.title}</strong>
            </button>
            <div class="letter-paper" aria-hidden="${!opened}">
              <h4>${letter.title}</h4>
              <p>${letter.body}</p>
            </div>
          </article>
        `;
      }).join("");

      grid.querySelectorAll(".letter-envelope button").forEach((button) => {
        button.addEventListener("click", () => {
          const card = button.closest(".letter-envelope");
          const id = card.dataset.letter;
          const opened = !card.classList.contains("is-open");
          card.classList.toggle("is-open", opened);
          button.setAttribute("aria-expanded", String(opened));
          card.querySelector(".letter-paper").setAttribute("aria-hidden", String(!opened));
          localStorage.setItem(`yl.letter.${id}`, String(opened));
          if (opened) window.YLEffects.confetti(button);
        });
      });
    }
  };
})();
