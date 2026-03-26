document.querySelectorAll(".link-card").forEach((card, index) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(10px)";

  window.setTimeout(() => {
    card.style.transition = "opacity 320ms ease, transform 320ms ease";
    card.style.opacity = "1";
    card.style.transform = "translateY(0)";
  }, 120 + index * 70);
});

const themeToggle = document.querySelector(".theme-toggle");
const themeIcon = document.querySelector(".theme-icon");
const shareButton = document.querySelector(".share-button");
const root = document.documentElement;
const storedTheme = window.localStorage.getItem("links-theme");

function applyTheme(theme) {
  root.setAttribute("data-theme", theme);
  const isDark = theme === "dark";

  if (themeToggle) {
    themeToggle.setAttribute("aria-label", isDark ? "Toggle light mode" : "Toggle dark mode");
    themeToggle.setAttribute("aria-pressed", String(isDark));
  }

  if (themeIcon) {
    themeIcon.textContent = isDark ? "dark_mode" : "light_mode";
  }
}

applyTheme(storedTheme === "light" ? "light" : "dark");

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    if (themeIcon) {
      themeIcon.classList.remove("is-animating");
      void themeIcon.offsetWidth;
      themeIcon.classList.add("is-animating");

      window.setTimeout(() => {
        themeIcon.classList.remove("is-animating");
      }, 340);
    }

    const nextTheme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
    window.localStorage.setItem("links-theme", nextTheme);
  });
}

if (shareButton) {
  shareButton.addEventListener("click", async () => {
    shareButton.classList.remove("is-animating");
    void shareButton.offsetWidth;
    shareButton.classList.add("is-animating");

    window.setTimeout(() => {
      shareButton.classList.remove("is-animating");
    }, 300);

    const shareData = {
      title: document.title,
      text: "Check out my links page.",
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }

      await navigator.clipboard.writeText(window.location.href);
      shareButton.setAttribute("aria-label", "Link copied");

      window.setTimeout(() => {
        shareButton.setAttribute("aria-label", "Share this page");
      }, 1600);
    } catch (error) {
      shareButton.setAttribute("aria-label", "Share unavailable");

      window.setTimeout(() => {
        shareButton.setAttribute("aria-label", "Share this page");
      }, 1600);
    }
  });
}
