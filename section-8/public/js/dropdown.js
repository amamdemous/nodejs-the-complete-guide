const toggleButton = document.querySelector(".nav-toggle");
const nav = document.querySelector("nav");
let isExpanded = false;

toggleButton.addEventListener("click", () => {
  if (isExpanded == true) {
    nav.classList.remove("nav-expanded");
    isExpanded = false;
  } else if (isExpanded == false) {
    nav.classList.add("nav-expanded");
    isExpanded = true;
  }
});
