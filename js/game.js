class Game {
  constructor() {
    this.startScreen = document.getElementById("game-intro");
    this.gameScreen = document.getElementById("game-container");
    this.endScreen = document.getElementById("game-end");
    this.player = new Player(this.gameScreen);
    this.gameIsOver = false;
    this.obstacles = [];
    //this is the score of the game.
    this.foodPointsElem = document.getElementsByClassName("food")[0];
    this.foodPoints = this.foodPointsElem.textContent.slice(-2);
    this.bushPointsElem = document.getElementsByClassName("bush")[0];
    this.bushPoints = this.bushPointsElem.textContent.slice(-2);
    this.gameIntervalId;
    this.gameLoopFrequency = Math.round(1000 / 60);
  }

  start() {
    this.startScreen.style.display = "none";
    this.endScreen.style.display = "none";
    this.gameScreen.style.display = "block";
    //here its constantly updating the screen
    this.gameIntervalId = setInterval(() => {
      this.gameLoop();
    }, this.gameLoopFrequency);
  }

  gameLoop() {
    this.update();
    if (this.gameIsOver) {
      clearInterval(this.gameIntervalId);
    }
  }

  update() {
    this.player.move();
    // console.log(`lenght of the array obstacle: ${this.obstacles.length}`);
    for (let i = 0; i < this.obstacles.length; i++) {
      const obstacle = this.obstacles[i];
      obstacle.move();

      if (this.player.didCollide(obstacle)) {
        console.log(`inside game-this.update, remove obstacle 1`);
        obstacle.element.remove();
        this.obstacles.splice(i, 1);
        this.foodPoints--;
        this.bushPoints--;
        i--;
      } else if (obstacle.top > this.height) {
        console.log(`inside game-this.update, remove 2`);
        this.foodPoints++;
        this.bushPoints++;
        obstacle.element.remove();
        this.obstacles.splice(i, 1);
        i--;
      }
    }

    this.foodPointsElem.textContent = `Food: ${this.foodPoints}`;
    this.bushPointsElem.textContent = `Bush: ${this.bushPoints}`;

    if (this.foodPoints === 0 || this.bushPoints === 0) {
      this.endGame();
    }

    if (Math.random() > 0.98 && this.obstacles.length < 1) {
      // console.log(`adding a new obstacle to my array`);
      this.obstacles.push(new Obstacles(this.gameScreen));
      // console.log(`new game- obstacle element: ${this.obstacles[0].element}`);
      // console.log(`lenght of the array after: ${this.obstacles.length}`);
    }
  }

  endGame() {
    this.player.element.remove();
    this.obstacles.forEach((obstacle) => obstacle.element.remove());
    this.gameIsOver = true;
    this.gameScreen.style.display = "none";
    // Show end game screen
    this.gameEndScreen.style.display = "block";
  }
}
