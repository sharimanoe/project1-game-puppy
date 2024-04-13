class Game {
  constructor() {
    this.startScreen = document.getElementById("game-intro");
    this.gameScreen = document.getElementById("game-container");
    this.endScreen = document.getElementById("game-end");
    this.player = new Player(this.gameScreen);
    this.gameIsOver = false;
    this.height = 600;
    this.width = 500;
    this.obstacles = [];
    //this is the score of the game.
    this.foodPointsElem = document.getElementsByClassName("food")[0];
    this.foodPoints = this.foodPointsElem.textContent.slice(-2);
    this.bushPointsElem = document.getElementsByClassName("bush")[0];
    this.bushPoints = this.bushPointsElem.textContent.slice(-2);
    this.gameIntervalId;
    this.gameLoopFrequency = Math.round(1000 / 60);
    this.timeDisplay = document.getElementById("timer");
    this.duration = 10;
    this.remainingTime = this.duration;
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
    this.remainingTime--;
    this.timeDisplay.textContent = this.remainingTime;

    this.update();
    if (this.gameIsOver) {
      clearInterval(this.gameIntervalId);
      this.timeDisplay.textContent = this.duration;
    }
  }

  update() {
    this.player.move();
    console.log(`lenght of the array obstacle: ${this.obstacles.length}`);
    if (this.obstacles.length !== undefined) {
      this.obstacles.length = 0;
    }

    //1st I don't have obstacles
    for (let i = 0; i < this.obstacles.length; i++) {
      console.log(`if my array is 0: ${this.element} it shoudnt be here`);
      const obstacle = this.obstacles[i];
      obstacle.move();

      if (this.player.didCollide(obstacle)) {
        console.log(`inside the loop, it shoud appears three times`);
        if (obstacle.friendly) {
          this.foodPoints++;
          this.bushPoints++;
          obstacle.element.remove();
          this.obstacles.splice(i, 1);
        } else {
          console.log(`inside game-this.update, remove obstacle 1`);
          obstacle.element.remove();
          //my array is empty, that is the problem
          this.obstacles.splice(i, 1);
          this.foodPoints--;
          this.bushPoints--;
          i--;
        }
        //the highest part of my obstacle and the hight of the game
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

    if (this.foodPoints === 0 || this.remainingTime === -500) {
      this.endGame();
    }

    if (Math.random() > 0.98 && this.obstacles.length < 3) {
      this.obstacles.push(new Obstacles(this.gameScreen, "img-cat"));
      this.obstacles.push(new Obstacles(this.gameScreen, "img-food"));
      this.obstacles.push(new Obstacles(this.gameScreen, "img-bush"));
      console.log(`new game- obstacle element: ${this.obstacles}`);
      console.log(`lenght of the array after: ${this.obstacles[0].element}`);
    }
  }

  endGame() {
    this.player.element.remove();
    this.obstacles.forEach((obstacle) => obstacle.element.remove());
    this.gameIsOver = true;
    this.gameScreen.style.display = "none";
    // Show end game screen
    this.endScreen.style.display = "block";
  }
}
