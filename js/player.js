class Player {
  constructor(gameScreen) {
    this.gameScreen = gameScreen;
    this.left = 200;
    this.top = 500;
    this.width = 100;
    this.height = 150;
    // this.directionX = 0;
    this.directionY = 0;
    this.element = document.getElementsByClassName("img-dog")[0];
  }

  move() {
    this.left += this.directionY;

    if (this.left < 10) {
      this.left = 10;
    }

    // handles right hand side
    if (this.left > this.gameScreen.offsetWidth - this.width - 10) {
      this.left = this.gameScreen.offsetWidth - this.width - 10;
    }

    // Update the player's dog position on the screen
    this.updatePosition();
  }

  updatePosition() {
    this.element.style.left = `${this.left}px`;
  }

  didCollide(obstacle) {
    const playerRect = this.element.getBoundingClientRect();
    const obstacleRect = obstacle.element.getBoundingClientRect();

    if (
      playerRect.left < obstacleRect.right &&
      playerRect.right > obstacleRect.left &&
      playerRect.top < obstacleRect.bottom &&
      playerRect.bottom > obstacleRect.top
    ) {
      return true;
    } else {
      return false;
    }
  }
}
