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
    let chili = document.createElement("div");
    chili.classList.add("chili");
    if (correctNumbers.includes(i)) chili.classList.add("correct");
    chili.innerHTML = '<img src="/imgs/chili.png"/>';
    chili.innerHTML += '<div class="overlay"></div>';
    grid.appendChild(chili);
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
  if (result === "lost") {
    lostModal.classList.add("show");
  } else if (result === "won") {
    clearInterval(x);
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
  img.classList.add("smudge");
  img.src = "/imgs/smudge.png";
  img.style.opacity = Math.floor(Math.random() * 2) + 2 / 10;

  c.appendChild(img);
  c.addEventListener("click", () => correctClick(c));
});

Array.from(document.querySelectorAll(".chili")).map((c) => {
  if (!c.classList.contains("correct")) {
    c.addEventListener("click", () => {
      wrongAudio.play();
      wrongAudio.currentTime = 0;
    });
  }
});
