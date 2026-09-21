(function () {
  const symbols = ["♥", "🩺", "🌻", "〰", "Y", "L", "💍", "📷", "📘", "✦"];
  let cards = [];
  let open = [];
  let matched = [];
  let moves = 0;
  let seconds = 0;
  let timer = null;

  function shuffle(values) {
    return [...values].sort(() => Math.random() - 0.5);
  }

  function updateStats() {
    document.getElementById("memoryStats").textContent = `Movimientos: ${moves} · Tiempo: ${seconds}s`;
  }

  function tick() {
    seconds += 1;
    updateStats();
  }

  function render() {
    const board = document.getElementById("memoryBoard");
    board.innerHTML = "";
    cards.forEach((card, index) => {
      const visible = open.includes(index) || matched.includes(card.symbol);
      const button = document.createElement("button");
      button.type = "button";
      button.className = visible ? "memory-card is-open" : "memory-card";
      button.textContent = visible ? card.symbol : "Y&L";
      button.addEventListener("click", () => reveal(index));
      board.appendChild(button);
    });
  }

  function reveal(index) {
    if (open.includes(index) || matched.includes(cards[index].symbol) || open.length === 2) return;
    open.push(index);
    render();
    if (open.length === 2) {
      moves += 1;
      const [first, second] = open;
      if (cards[first].symbol === cards[second].symbol) {
        matched.push(cards[first].symbol);
        open = [];
        if (matched.length === symbols.length) {
          localStorage.setItem("yl.memory.completed", "true");
          document.getElementById("memoryMessage").textContent = "Completaste la memoria, igual que guardas bonito nuestros recuerdos ♥";
          window.YLEffects.confetti(document.getElementById("memoryBoard"));
        }
      } else {
        setTimeout(() => {
          open = [];
          render();
        }, 650);
      }
      updateStats();
    }
  }

  function reset() {
    cards = shuffle([...symbols, ...symbols].map((symbol, index) => ({ id: `${symbol}-${index}`, symbol })));
    open = [];
    matched = [];
    moves = 0;
    seconds = 0;
    document.getElementById("memoryMessage").textContent = "";
    updateStats();
    render();
    if (!timer) timer = setInterval(tick, 1000);
  }

  window.YLMemory = {
    init() {
      document.getElementById("memoryReset").addEventListener("click", reset);
      reset();
    }
  };
})();
