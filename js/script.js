// whith this sentence I set this page as the first one to be run by HTML
window.onload = function () {
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");
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

      // Update player's directionY based on the key pressed
      switch (key) {
        case "ArrowLeft":
          game.player.directionY = -1;
          break;
        case "ArrowRight":
          game.player.directionY = 1;
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
  }
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
