(function () {
  function initHeart(openLetter) {
    const heart = document.getElementById("heartCore");
    const portal = document.getElementById("portalLayer");

    heart.addEventListener("click", openLetter);
    heart.addEventListener("pointerenter", () => portal.classList.add("is-near"));
    heart.addEventListener("pointerleave", () => portal.classList.remove("is-near"));

    return { heart, portal };
  }

  window.FloresHeart = { initHeart };
})();
