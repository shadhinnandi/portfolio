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
const navLinks = document.querySelectorAll(".dock-nav__link");
const anchorSections = Array.from(document.querySelectorAll("section[id]"));

const setActiveLink = (activeId) => {
  navLinks.forEach((link) => {
    if (link.getAttribute("href") === `#${activeId}`) {
      link.classList.add("is-active");
    } else {
      link.classList.remove("is-active");
    }
  });
};

if (navLinks.length) {
  // click fallback for browsers without IntersectionObserver
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const hash = link.getAttribute("href");
      if (hash && hash.startsWith("#")) {
        setActiveLink(hash.substring(1));
      }
    });
  });

  if ("IntersectionObserver" in window && anchorSections.length) {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveLink(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-40% 0px -40% 0px",
        threshold: 0,
      }
    );

    anchorSections.forEach((section) => obs.observe(section));
  } else if (anchorSections.length) {
    // fallback to scroll listener if observer unsupported
    const onScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 2;
      let currentId = anchorSections[0].id;
      anchorSections.forEach((section) => {
        if (section.offsetTop <= scrollPos) {
          currentId = section.id;
        }
      });
      setActiveLink(currentId);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  } else {
    // default to first nav link
    setActiveLink(navLinks[0].getAttribute("href").replace("#", ""));
  }

  // Ensure a link is highlighted on initial load
  if (anchorSections.length) {
    setActiveLink(anchorSections[0].id);
  } else {
    setActiveLink(navLinks[0].getAttribute("href").replace("#", ""));
  }
}