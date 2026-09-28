/* ================= PORTFOLIO JAVASCRIPT ================= */

/* ---------- Mobile Hamburger Menu ---------- */

function initMobileMenu() {
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");

  if (!menuToggle || !navMenu) {
    console.warn("Mobile menu elements were not found.");
    return;
  }

  const closeMenu = () => {
    navMenu.classList.remove("active");
    menuToggle.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
  };

  const toggleMenu = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const isOpen = !navMenu.classList.contains("active");

    navMenu.classList.toggle("active", isOpen);
    menuToggle.classList.toggle("active", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu"
    );
  };

  // Use pointerdown as well as click so the button works reliably on phones.
  menuToggle.addEventListener("click", toggleMenu);

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", (event) => {
    if (
      navMenu.classList.contains("active") &&
      !navMenu.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      closeMenu();
    }
  });
}


/* ---------- Changing Hero Line ---------- */

function initChangingLine() {
  const tag = document.querySelector(".tag");

  if (!tag) return;

  const titles = [
    "Software Engineer",
    "Web Developer",
    "Problem Solver"
  ];

  let currentIndex = 0;

  const changeTitle = () => {
    tag.classList.add("changing");

    setTimeout(() => {
      tag.textContent = titles[currentIndex];
      currentIndex = (currentIndex + 1) % titles.length;
      tag.classList.remove("changing");
    }, 250);
  };

  // Show the first title immediately.
  tag.textContent = titles[0];
  currentIndex = 1;

  // Change every 2.2 seconds.
  setInterval(changeTitle, 2200);
}


/* ---------- Active Navigation Link ---------- */

function initActiveNavigation() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll("nav ul li a");

  if (!sections.length || !navLinks.length) return;

  window.addEventListener("scroll", () => {
    let current = "home";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 150;

      if (window.scrollY >= sectionTop) {
        current = section.id;
      }
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      const isActive = href === `#${current}`;

      link.classList.toggle("active-link", isActive);
    });
  });
}


/* ---------- Start Everything ---------- */

document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initChangingLine();
  initActiveNavigation();
});
