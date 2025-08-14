import { projects } from "./projects";

const menuToggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav");

const popup = document.getElementById("project-popup");
const popupTitle = document.getElementById("popup-title");
const popupDescription = document.getElementById("popup-description");
const popupTech = document.getElementById("popup-tech");
const popupDeployed = document.getElementById("popup-deployed");
const popupRepo = document.getElementById("popup-repo");
const popupClose = document.getElementById("popup-close");

const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const themeThumb = document.getElementById("theme-thumb");

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
      popupTech.textContent = project.tech;
      popupDeployed.href = project.deployed;
      popupRepo.href = project.repo;

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
