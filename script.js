const emojis = ["🐼", "🐶", "🐞", "🦀", "🦋", "🐔", "🐦", "🐋"];
let shuffledEmojis = [];
let firstPick = null;
let secondPick = null;
let attempts = 0;
let disableClick = false;

document.addEventListener("DOMContentLoaded", () => {
  createBoard();
  playBackgroundMusic();
});

function createBoard() {
  const gameContainer = document.getElementById("gameContainer");
  gameContainer.innerHTML = "";
  attempts = 0;
  updateScore();

  shuffledEmojis = shuffleArray([...emojis, ...emojis]);

  shuffledEmojis.forEach(emoji => {
    const box = document.createElement("div");
    box.classList.add("box");
    box.dataset.emoji = emoji;
    box.addEventListener("click", () => revealEmoji(box));
    gameContainer.appendChild(box);
  });
}

function revealEmoji(box) {
  if (disableClick || box.classList.contains("revealed") || box.classList.contains("matched")) return;

  box.classList.add("clicked");
  setTimeout(() => box.classList.remove("clicked"), 200);

  box.classList.add("revealed");
  box.textContent = box.dataset.emoji;

  if (!firstPick) {
    firstPick = box;
  } else {
    secondPick = box;
    attempts++;
    updateScore();
    disableClick = true;

    if (firstPick.dataset.emoji === secondPick.dataset.emoji) {
      firstPick.classList.add("matched");
      secondPick.classList.add("matched");
      firstPick = secondPick = null;
      disableClick = false;

      if (document.querySelectorAll(".matched").length === shuffledEmojis.length) {
        showCongratsModal();
      }
    } else {
      setTimeout(() => {
        firstPick.classList.remove("revealed");
        firstPick.textContent = "";
        secondPick.classList.remove("revealed");
        secondPick.textContent = "";
        firstPick = secondPick = null;
        disableClick = false;
      }, 1000);
    }
  }
}

function updateScore() {
  document.getElementById("score").textContent = `Attempts: ${attempts}`;
}

function showCongratsModal() {
  document.getElementById("congratsModal").style.display = "flex";
}

function resetGame() {
  document.getElementById("congratsModal").style.display = "none";
  createBoard();
}

function playBackgroundMusic() {
  const music = document.getElementById("backgroundMusic");
  music.volume = 0.1;
  music.play();
}


function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
