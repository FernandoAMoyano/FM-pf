import { projects } from "./projects";

const menuToggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav");

/* popup */
const popup = document.getElementById("project-popup");
const popupTitle = document.getElementById("popup-title");
const popupDescription = document.getElementById("popup-description");
const techList = document.getElementById("tech-list");
const popupDeployed = document.getElementById("popup-deployed");
const popupRepo = document.getElementById("popup-repo");
const popupClose = document.getElementById("popup-close");

/* theme toggle */
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");

menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("active");
  nav.classList.toggle("active");
});

document.querySelectorAll(".btn[data-project]").forEach((button) => {
  button.addEventListener("click", () => {
    const projectId = button.getAttribute("data-project");
    const project = projects[projectId];

    if (project) {
      popupTitle.textContent = project.title;
      popupDescription.textContent = project.description;
      popupDeployed.href = project.deployed;
      popupRepo.href = project.repo;

      // Renderizar lista de tecnologías con iconos
      if (techList && project.technologies) {
        techList.innerHTML = project.technologies
          .map((tech) => {
            let iconHTML = '';
            if (tech.icon === "custom-svg") {
              // Para SVG personalizado
              iconHTML = `<span class="tech-icon ${tech.class}">${tech.svg}</span>`;
            } else {
              // Para iconos de devicon
              iconHTML = `<i class="${tech.icon} colored tech-icon ${tech.class}"></i>`;
            }
            return `<li class="tech-item">${iconHTML}<span class="tech-name">${tech.name}</span></li>`;
          })
          .join("");
      }

      popup.classList.remove("hidden");
    }
  });
});

popupClose.addEventListener("click", () => {
  popup.classList.add("hidden");
});

window.addEventListener("click", (event) => {
  if (event.target === popup) {
    popup.classList.add("hidden");
  }
});

function setTheme(isDark) {
  document.body.classList.toggle("dark-mode", isDark);
  themeIcon.textContent = isDark ? "☀️" : "🌙";
  themeToggle.setAttribute(
    "aria-label",
    isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"
  );
}

// Guardar preferencia en localStorage
if (localStorage.getItem("theme") === "dark") {
  setTheme(true);
}

themeToggle.addEventListener("click", () => {
  const isDark = !document.body.classList.contains("dark-mode");
  setTheme(isDark);
  localStorage.setItem("theme", isDark ? "dark" : "light");
});
