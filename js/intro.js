
(function () {
  const overlay = document.getElementById("intro-overlay");
  if (!overlay) return;
  const alreadyShown = sessionStorage.getItem("avsarIntroShown");
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (alreadyShown) {
    overlay.classList.add("intro-hidden");
    return;
  }

  document.body.classList.add("intro-active");

  const finish = () => {
    overlay.classList.add("intro-exit");
    document.body.classList.remove("intro-active");
    sessionStorage.setItem("avsarIntroShown", "1");
    window.setTimeout(() => {
      overlay.classList.add("intro-hidden");
    }, 850);
  };

  if (prefersReducedMotion) {
    finish();
    return;
  }

  const timers = [
    window.setTimeout(() => overlay.classList.add("intro-step-1"), 200),
    window.setTimeout(() => {
      overlay.classList.remove("intro-step-1");
      overlay.classList.add("intro-step-2");
    }, 2200),
    window.setTimeout(() => {
      overlay.classList.remove("intro-step-2");
      overlay.classList.add("intro-step-3");
    }, 3400),
    window.setTimeout(finish, 5200),
  ];

  const skipButton = document.getElementById("intro-skip");
  if (skipButton) {
    skipButton.addEventListener("click", () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      finish();
    });
  }
})();
