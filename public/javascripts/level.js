const grid = document.querySelector(".grid");
const winModal = document.querySelector("#winModal");
const lostModal = document.querySelector("#lostModal");
const winModalButton = document.querySelector("#winModalButton");
const correctAudio = document.querySelector("#correctAudio");
const wrongAudio = document.querySelector("#wrongAudio");
const bgAudio = document.querySelector("#bgAudio");

bgAudio.volume = 0.5;

Audio.prototype.play = (function (play) {
  return function () {
    var audio = this,
      args = arguments,
      promise = play.apply(audio, args);
    if (promise !== undefined) {
      promise.catch((_) => {
        // Autoplay was prevented. This is optional, but add a button to start playing.
      });
    }
  };
})(Audio.prototype.play);

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
  bgAudio.currentTime = 0;
  bgAudio.play();
};

createGrid();

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

lostModalButton.addEventListener("click", () => window.location.reload());

const gameOver = (result) => {
  console.log("game over");
  console.log(result);
  if (result === "lost") {
    console.log("game lost");
    lostModal.classList.add("show");
  } else if (result === "won") {
    clearInterval(x);
    console.log("game won");
    winModal.classList.add("show");
  }
};

const correctClick = (c) => {
  c.classList.add("clicked");
  correctAudio.play();
  correctAudio.currentTime = 0;
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

Array.from(document.querySelectorAll(".candy")).map((c) => {
  if (!c.classList.contains("correct")) {
    c.addEventListener("click", () => {
      wrongAudio.play();
      wrongAudio.currentTime = 0;
    });
  }
});
