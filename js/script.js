// whith this sentence I set this page as the first one to be run by HTML
window.onload = function () {
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");
  let game;
  let timer;
  //to handler the pop-up button
  const clickBtn = document.getElementById("info-game");
  const popup = document.getElementById("popup");
  const closeBtn = document.getElementById("closeBtn");

  function handleKeydown(event) {
    const key = event.key;
    const possibleKeystrokes = ["ArrowLeft", "ArrowRight"];

    // Check if the pressed key is in the possibleKeystrokes array
    if (possibleKeystrokes.includes(key)) {
      event.preventDefault();
      // sets the speed of the element
      switch (key) {
        case "ArrowLeft":
          game.player.directionY = -10;
          break;
        case "ArrowRight":
          game.player.directionY = 10;
          break;
      }
    }
  }

  // Function that handles keydown event
  window.addEventListener("keydown", handleKeydown);

  startButton.addEventListener("click", function () {
    startGame();
  });

  function startGame() {
    startButton.disabled = true;
    game = new Game();
    game.start();

    if (timer) clearInterval(timer);
    timer = startTimer();
  }

  function startTimer() {
    return setInterval(() => {
      if (!game || game.gameIsOver) return;
      const minutes = Math.floor(game.timeRemaining / 60)
        .toString()
        .padStart(2, "0");
      const seconds = (game.timeRemaining % 60).toString().padStart(2, "0");

      const timeRemainingContainer = document.getElementById("timer");
      timeRemainingContainer.innerText = `${minutes}:${seconds}`;

      game.timeRemaining--;

      if (game.timeRemaining <= 0) {
        clearInterval(timer);
      }
    }, 1000);
  }

  timer = startTimer();

  const restartTimer = () => {
    clearInterval(timer);
    timer = startTimer();
  };

  //to handler the pop-up button
  clickBtn.addEventListener("click", () => {
    popup.style.display = "block";
  });
  closeBtn.addEventListener("click", () => {
    popup.style.display = "none";
  });
  popup.addEventListener("click", () => {
    popup.style.display = "none";
  });

  restartButton.addEventListener("click", function () {
    location.reload();
  });
};
