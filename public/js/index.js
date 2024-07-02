document.addEventListener("DOMContentLoaded", () => {
  const hamburgerMenuButton = document.querySelector("button");
  const menu = document.querySelector("ul");
  hamburgerMenuButton.addEventListener("click", () => {
    menu.classList.toggle("hidden");
  });
});
