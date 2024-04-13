class Obstacles {
  constructor(gameScreen, typeObstacle) {
    this.gameScreen = gameScreen;
    this.left = Math.floor(Math.random() * 300 + 70);
    this.top = 0;
    this.width = 100;
    this.height = 150;
    this.element = document.getElementsByClassName(typeObstacle)[0];
    this.friendly = () => {
      if (typeObstacle === "img-cat") {
        return false;
      } else {
        return true;
      }
    };
  }
  updatePosition() {
    console.log(`obstacles - element: ${this.element}`);
    // Update the obstacle's position based on the properties left and top
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  }

  move() {
    // Move the obstacle down by 3px
    this.top += 3;
    // Update the obstacle's position on the screen
    this.updatePosition();
  }
}
