class Game {
  constructor() {
    this.startScreen = document.getElementById("game-intro");
    this.gameScreen = document.getElementById("game-container");
    this.endScreen = document.getElementById("game-end");
    this.player = new Player(
      this.gameScreen,
      200,
      500,
      100,
      150,
      "./assets/dog.png"
    );

    // this.height = 805;
    // this.width = 792;
    this.height = 600;
    this.width = 500;
    this.obstacles = [];
    // this.score = 0;
    // this.lives = 3;
    this.foodPoints = 10; ///maybe here I can obtain the object from html
    this.bushPoints = 10;
    this.foodPointsElem = document.getElementsByClassName("food")[0];
    this.foodPoints = this.foodPointsElem.textContent.slice(-2);
    this.bushPointsElem = document.getElementsByClassName("bush")[0];
    this.bushPoints = this.bushPointsElem.textContent.slice(-2);

    this.gameIsOver = false;
    this.gameIntervalId;
    this.gameLoopFrequency = Math.round(1000 / 60);
    this.timeRemaining = 30;

    // this.timeDisplay = document.getElementById("timer");
    // this.duration = 1000;
    // this.remainingTime = this.duration;
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
    //decrece timer
    // this.remainingTime--;
    // this.timeDisplay.textContent = this.remainingTime;

    this.update();
    if (this.gameIsOver) {
      clearInterval(this.gameIntervalId);
      // this.timeDisplay.textContent = this.duration;
    }
  }

  update() {
    this.player.move();

    //1st I don't have obstacles
    for (let i = 0; i < this.obstacles.length; i++) {
      const obstacle = this.obstacles[i];

      obstacle.move();

      if (this.player.didCollide(obstacle)) {
        if (obstacle.friendly) {
          this.foodPoints++;
          this.bushPoints++;
          obstacle.element.remove();
          this.obstacles.splice(i, 1);
        } else {
          obstacle.element.remove();
          this.obstacles.splice(i, 1);
          this.foodPoints -= 3;
          this.bushPoints--;
          i--;
        }
        //the highest part of my obstacle and the hight of the game
      } else if (obstacle.top > this.height) {
        this.foodPoints++;
        this.bushPoints++;
        obstacle.element.remove();
        this.obstacles.splice(i, 1);
        i--;
      }
    }

    this.foodPointsElem.textContent = `Food: ${this.foodPoints}`;
    this.bushPointsElem.textContent = `Bush: ${this.bushPoints}`;

    if (
      this.foodPoints === 0 ||
      this.bushPoints === 0 ||
      this.remainingTime === 0
    ) {
      this.endGame();
    }

    if (Math.random() > 0.98 && this.obstacles.length < 2) {
      this.obstacles.push(new Obstacles(this.gameScreen, "/assets/food.png"));
    }
    if (Math.random() > 0.98 && this.obstacles.length < 2) {
      this.obstacles.push(new Obstacles(this.gameScreen, "/assets/bush.png"));
    }
    if (Math.random() > 0.98 && this.obstacles.length < 3) {
      this.obstacles.push(new Obstacles(this.gameScreen, "/assets/cat.png"));
    }
  }

  endGame() {
    console.log(`end of the game`);
    this.player.element.remove();
    this.obstacles.forEach((obstacle) => obstacle.element.remove());
    this.gameIsOver = true;
    this.gameScreen.style.display = "none";
    // Show end game screen
    this.endScreen.style.display = "block";
    console.log(`end of the game2`);
  }
}
