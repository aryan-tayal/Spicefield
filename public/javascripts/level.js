const grid = document.querySelector(".grid");
const winModal = document.querySelector("#winModal");
const lostModal = document.querySelector("#lostModal");
const winModalButton = document.querySelector("#winModalButton");

const srcs = [
  "/imgs/foot-both.png",
  "/imgs/foot-left.png",
  "/imgs/foot-right.png",
  "/imgs/hand-right.png",
  "/imgs/hand-left.png",
];

let correctNumbers = [];
correct.split(",").forEach((c) => correctNumbers.push(parseInt(c)));

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
    candy.innerHTML += '<div class="overlay"></div>';
    grid.appendChild(candy);
  }
};

createGrid();

lostModalButton.addEventListener("click", () => window.location.reload());

const gameOver = (result) => {
  console.log("game over");
  console.log(result);
  if (result === "lost") {
    console.log("game lost");
    lostModal.classList.add("show");
  } else if (result === "won") {
    console.log("game won");
    winModal.classList.add("show");
  }
};

const createTimer = () => {
  let timerValue = time;
  let x = setInterval(function () {
    document.getElementById("timerText").innerHTML = timerValue;
    if (timerValue === 0) {
      clearInterval(x);
      document.getElementById("timerText").innerHTML = "0";
      gameOver("lost");
    }
    timerValue--;
  }, 1000);
};

createTimer();

const correctClick = (c) => {
  c.classList.add("clicked");
  if (
    Array.from(document.querySelectorAll(".clicked")).length ===
    correctNumbers.length
  ) {
    gameOver("won");
  }
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
