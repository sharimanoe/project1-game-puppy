class Player extends Component {
  constructor(gameScreen, left, top, width, height, imgSrc) {
    super(gameScreen, left, top, width, height, "/assets/dog.png");
    this.directionX = 0;
    this.directionY = 0;
  }

  // constructor(gameScreen) {
  //   this.gameScreen = gameScreen;
  //   this.left = 300;
  //   this.top = 200;
  //   this.width = 792;
  //   this.height = 805;
  //   this.directionY = 0;
  //   this.element = document.getElementsByClassName("img-dog")[0];
  // }

  move() {
    this.left += this.directionY;

    if (this.left < 10) {
      this.left = 10;
    }

    // handles right hand side dimentions of the screen
    if (this.left > this.gameScreen.offsetWidth - this.width - 100) {
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
