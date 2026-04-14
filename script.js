const slides = Array.from(document.querySelectorAll(".hero-slide"));
let currentSlide = 0;
const ua = navigator.userAgent || "";
const isInstagramWebView = /Instagram/i.test(ua);

if (slides.length > 1 && !isInstagramWebView) {
  window.setInterval(() => {
    slides[currentSlide].classList.remove("is-active");
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add("is-active");
  }, 4200);
}

if (isInstagramWebView && slides.length > 1) {
  slides.forEach((slide, index) => {
    slide.classList.toggle("is-active", index === 0);
  });
}

const navToggle = document.querySelector("[data-nav-toggle]");
const navMenu = document.querySelector("[data-nav-menu]");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

document.querySelectorAll(".faq-item").forEach((item) => {
  const button = item.querySelector(".faq-question");

  button?.addEventListener("click", () => {
    const isOpen = item.getAttribute("data-open") === "true";
    item.setAttribute("data-open", String(!isOpen));
    button.setAttribute("aria-expanded", String(!isOpen));
  });
});

const revealItems = document.querySelectorAll("[data-reveal]");

if (isInstagramWebView) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else if ("IntersectionObserver" in window && revealItems.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -30px 0px"
    }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
