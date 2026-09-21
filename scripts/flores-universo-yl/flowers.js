(function () {
  const random = (min, max) => min + Math.random() * (max - min);

  function applyNodeVars(node, item) {
    node.style.setProperty("--x", `${item.x}%`);
    node.style.setProperty("--y", `${item.y}%`);
    node.style.setProperty("--z", `${item.z}px`);
    node.style.setProperty("--rot", `${item.rot}deg`);
    node.style.setProperty("--scale", item.scale);
    node.style.setProperty("--size", item.size);
    node.style.setProperty("--blur", item.blur);
    node.style.setProperty("--alpha", item.alpha);
    node.style.setProperty("--duration", `${item.duration}s`);
  }

  function createImageFlower(config, item) {
    const node = document.createElement("div");
    node.className = "flower-node image-flower";
    applyNodeVars(node, item);

    const image = document.createElement("img");
    image.src = item.src || config.images.sunflowerBouquet;
    image.alt = "";
    image.loading = "eager";
    node.append(image);
    return node;
  }

  function createEmojiFlower(config, item) {
    const node = document.createElement("div");
    node.className = "flower-node emoji-flower";
    node.textContent = item.emoji || config.flowerEmojis[Math.floor(Math.random() * config.flowerEmojis.length)];
    applyNodeVars(node, item);
    return node;
  }

  function createFiller(item) {
    const node = document.createElement("div");
    node.className = "spark-node";
    node.style.setProperty("--x", `${item.x}%`);
    node.style.setProperty("--y", `${item.y}%`);
    node.style.setProperty("--z", `${item.z}px`);
    node.style.setProperty("--size", item.size);
    node.style.setProperty("--scale", item.scale);
    node.style.setProperty("--rot", `${item.rot}deg`);
    node.style.setProperty("--alpha", item.alpha);
    node.style.setProperty("--duration", `${item.duration}s`);
    return node;
  }

  function renderFlowers(config) {
    const far = document.getElementById("farFlowers");
    const mid = document.getElementById("midFlowers");
    const front = document.getElementById("frontFlowers");
    const sparkles = document.getElementById("frontSparkles");

    const farItems = [
      { x: 10, y: 70, z: -180, size: "150px", scale: 0.8, rot: -18, blur: "2.5px", alpha: 0.45, duration: 11 },
      { x: 86, y: 68, z: -150, size: "170px", scale: 0.86, rot: 18, blur: "2px", alpha: 0.5, duration: 12 },
      { x: 31, y: 34, z: -120, size: "86px", scale: 0.75, rot: 12, blur: "1.5px", alpha: 0.44, duration: 10 },
      { x: 73, y: 28, z: -130, size: "92px", scale: 0.78, rot: -14, blur: "1.8px", alpha: 0.42, duration: 12 }
    ];

    const midItems = [
      { x: 18, y: 82, z: 40, size: "230px", scale: 0.92, rot: -9, blur: "0.8px", alpha: 0.82, duration: 8 },
      { x: 80, y: 79, z: 55, size: "250px", scale: 0.95, rot: 10, blur: "0.8px", alpha: 0.84, duration: 8.4 },
      { x: 31, y: 60, z: 80, size: "72px", scale: 1, rot: -12, blur: "0px", alpha: 0.9, duration: 7.6, emoji: "🌻" },
      { x: 69, y: 58, z: 90, size: "76px", scale: 1, rot: 10, blur: "0px", alpha: 0.9, duration: 7.2, emoji: "🌼" }
    ];

    const frontItems = [
      { x: 2, y: 104, z: 180, size: "360px", scale: 1.12, rot: -10, blur: "0px", alpha: 0.94, duration: 7 },
      { x: 98, y: 105, z: 190, size: "380px", scale: 1.16, rot: 11, blur: "0px", alpha: 0.94, duration: 7 },
      { x: 50, y: 108, z: 220, size: "330px", scale: 1.08, rot: 0, blur: "0px", alpha: 0.88, duration: 8.8 }
    ];

    farItems.forEach((item, index) => {
      const node = index > 1 ? createEmojiFlower(config, item) : createImageFlower(config, item);
      far.append(node);
    });
    midItems.forEach((item, index) => {
      const node = index > 1 ? createEmojiFlower(config, item) : createImageFlower(config, item);
      mid.append(node);
    });
    frontItems.forEach((item) => front.append(createImageFlower(config, item)));

    const sparkleCount = window.innerWidth < 720 ? 20 : 36;
    for (let i = 0; i < sparkleCount; i += 1) {
      sparkles.append(createFiller({
        x: random(4, 96),
        y: random(22, 94),
        z: random(80, 240),
        size: `${random(4, 12)}px`,
        scale: random(0.8, 1.5).toFixed(2),
        rot: random(-40, 40),
        alpha: random(0.3, 0.88).toFixed(2),
        duration: random(1.8, 4.2).toFixed(2)
      }));
    }
  }

  function renderPhrases(config) {
    const layer = document.getElementById("phraseLayer");
    config.phrases.forEach((text, index) => {
      const node = document.createElement("span");
      node.className = "phrase-node";
      node.textContent = text;
      const angle = (Math.PI * 2 * index) / config.phrases.length;
      const radiusX = window.innerWidth < 720 ? 34 : 38;
      const radiusY = window.innerWidth < 720 ? 25 : 30;
      applyNodeVars(node, {
        x: 50 + Math.cos(angle) * radiusX,
        y: 52 + Math.sin(angle) * radiusY,
        z: 60 + Math.sin(angle) * 80,
        rot: Math.sin(angle) * 8,
        scale: (0.82 + (Math.cos(angle) + 1) * 0.14).toFixed(2),
        size: "auto",
        blur: "0px",
        alpha: 0.95,
        duration: 5 + (index % 4)
      });
      layer.append(node);
    });
  }

  window.FloresFlowers = { renderFlowers, renderPhrases };
})();
