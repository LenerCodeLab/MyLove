(function () {
  let tiles = [];
  let solved = [];
  let moves = 0;
  let seconds = 0;
  let timer = null;

  function shuffle(values) {
    return [...values].sort(() => Math.random() - 0.5);
  }

  function tick() {
    seconds += 1;
    updateStats();
  }

  function updateStats() {
    document.getElementById("puzzleStats").textContent = `Movimientos: ${moves} · Tiempo: ${seconds}s`;
  }

  function isSolved() {
    return tiles.every((tile, index) => tile === index);
  }

  function render() {
    const board = document.getElementById("puzzleBoard");
    const image = document.getElementById("puzzleImage").value;
    const size = Number(document.getElementById("puzzleSize").value);
    board.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    board.innerHTML = "";
    tiles.forEach((tile, index) => {
      const x = tile % size;
      const y = Math.floor(tile / size);
      const button = document.createElement("button");
      button.type = "button";
      button.className = "puzzle-tile";
      button.draggable = true;
      button.style.backgroundImage = `url(${image})`;
      button.style.backgroundSize = `${size * 100}% ${size * 100}%`;
      button.style.backgroundPosition = `${(x / (size - 1)) * 100}% ${(y / (size - 1)) * 100}%`;
      button.addEventListener("dragstart", (event) => event.dataTransfer.setData("text/plain", String(index)));
      button.addEventListener("dragover", (event) => event.preventDefault());
      button.addEventListener("drop", (event) => swap(Number(event.dataTransfer.getData("text/plain")), index));
      button.addEventListener("click", () => index > 0 && swap(index, index - 1));
      board.appendChild(button);
    });
  }

  function swap(from, to) {
    [tiles[from], tiles[to]] = [tiles[to], tiles[from]];
    moves += 1;
    render();
    updateStats();
    if (isSolved() && moves > 0) {
      localStorage.setItem("yl.puzzle.completed", "true");
      const messages = window.YL_CONTENT.puzzleMessages;
      document.getElementById("puzzleMessage").textContent = messages[moves % messages.length];
      window.YLEffects.confetti(document.getElementById("puzzleBoard"));
    }
  }

  function reset() {
    const size = Number(document.getElementById("puzzleSize").value);
    solved = Array.from({ length: size * size }, (_, index) => index);
    tiles = shuffle(solved);
    moves = 0;
    seconds = 0;
    document.getElementById("puzzleMessage").textContent = "";
    updateStats();
    render();
    if (!timer) timer = setInterval(tick, 1000);
  }

  window.YLPuzzle = {
    init(gallery) {
      const select = document.getElementById("puzzleImage");
      select.innerHTML = gallery.map((photo) => `<option value="${photo.src}">${photo.date}</option>`).join("");
      document.getElementById("puzzleReset").addEventListener("click", reset);
      document.getElementById("puzzleSize").addEventListener("change", reset);
      select.addEventListener("change", reset);
      reset();
    }
  };
})();
