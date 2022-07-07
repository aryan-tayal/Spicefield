const loader = document.querySelector(".loader");
setTimeout(() => {
  loader.classList.add("hide");
}, 3000);

const form = document.querySelector("form");
const button = document.querySelector("form button");
const input = document.querySelector("input");

form.addEventListener("submit", (e) => {
  console.log("hi");
  button.classList.add("disabled");
  if (!input.value) {
    e.preventDefault();
  }
});
