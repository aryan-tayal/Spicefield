const grid = document.querySelector(".grid");
const srcs = [
  "/imgs/foot-both.png",
  "/imgs/foot-left.png",
  "/imgs/foot-right.png",
  "/imgs/hand-right.png",
  "/imgs/hand-left.png",
];

const createGrid = () => {
  for (
    let i = 1;
    i <= new Array(parseInt(gridNumber * gridNumber)).length;
    i++
  ) {
    let candy = document.createElement("div");
    candy.classList.add("candy");
    if (correctNumbers.includes(i)) candy.classList.add("correct");
    for (let j = 0; j < new Array(4).length; j++) {
      candy.innerHTML += '<div class="red"></div>';
    }
    candy.innerHTML+='<div class="overlay"></div>'
    grid.appendChild(candy);
  }
};

createGrid();

const correctClick = (c) => {
  c.classList.add("clicked");
};

Array.from(document.querySelectorAll(".correct")).map((c) => {
  const img = document.createElement("img");
  img.src = srcs[Math.floor(Math.random() * srcs.length)];
  img.style.top = `${Math.floor(Math.random() * 80) - 40}%`;
  img.style.left = `${Math.floor(Math.random() * 80) - 40}%`;
  img.style.opacity = 0.7;

  c.appendChild(img);
  c.addEventListener("click", () => correctClick(c));
});
