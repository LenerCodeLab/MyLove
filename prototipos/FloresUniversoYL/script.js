import { initThreeUniverse } from "./js/scene.js";

document.addEventListener("DOMContentLoaded", () => {
  const config = window.FLORES_YL_CONFIG;
  const modal = window.FloresModal.initModal(config);
  const music = window.FloresModal.initMusic(config);
  const universe = initThreeUniverse({ config, openLetter: modal.open });
  const intro = document.getElementById("introOverlay");
  const enter = document.getElementById("enterUniverse");
  createIntroSunflowerRain();

  enter.addEventListener("click", () => {
    music.play();
    intro.classList.add("is-hidden");
    universe.enter();
  });
});

function createIntroSunflowerRain() {
  const layer = document.querySelector(".intro-sunflower-rain");
  if (!layer) return;
  const count = window.innerWidth < 720 ? 28 : 44;
  for (let i = 0; i < count; i += 1) {
    const flower = document.createElement("i");
    flower.className = "intro-sunflower";
    const far = i % 3 === 0;
    flower.style.setProperty("--x", `${Math.random() * 100}%`);
    flower.style.setProperty("--size", `${far ? 9 + Math.random() * 7 : 14 + Math.random() * 10}px`);
    flower.style.setProperty("--alpha", `${far ? 0.18 + Math.random() * 0.16 : 0.28 + Math.random() * 0.2}`);
    flower.style.setProperty("--duration", `${16 + Math.random() * 14}s`);
    flower.style.setProperty("--delay", `${-Math.random() * 26}s`);
    flower.style.setProperty("--drift", `${-45 + Math.random() * 90}px`);
    flower.style.setProperty("--sway", `${5 + Math.random() * 5}s`);
    flower.style.setProperty("--sway-x", `${-12 + Math.random() * 24}px`);
    flower.style.setProperty("--spin", `${Math.random() > 0.5 ? "" : "-"}${80 + Math.random() * 180}deg`);
    flower.style.setProperty("--rot", `${Math.random() * 360}deg`);
    layer.append(flower);
  }
}
