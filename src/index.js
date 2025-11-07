import initScrollReveal from "./scripts/scrollReveal";
import initTiltEffect from "./scripts/tiltAnimation";
import { targetElements, defaultProps } from "./data/scrollRevealConfig";

initScrollReveal(targetElements, defaultProps);
initTiltEffect();

// Scroll progress bar
const progressEl = document.getElementById("scroll-progress");
if (progressEl) {
  const updateProgress = () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressEl.style.width = `${scrolled}%`;
  };
  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress);
  updateProgress();
}

// Navigation active state handling
const navLinks = document.querySelectorAll(".site-nav__link");
if (navLinks.length) {
  const setActiveLink = (activeLink) => {
    navLinks.forEach((link) => link.classList.remove("is-active"));
    activeLink.classList.add("is-active");
  };

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      setActiveLink(link);
    });
  });

  setActiveLink(navLinks[0]);
}