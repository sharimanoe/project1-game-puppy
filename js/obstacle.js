class Obstacles {
  constructor(gameScreen) {
    this.gameScreen = gameScreen;
    this.left = Math.floor(Math.random() * 300 + 70);
    this.top = 0;
    this.width = 100;
    this.height = 150;
    this.element = document.getElementsByClassName("img-cat")[0];
  }
  updatePosition() {
    // Update the obstacle's position based on the properties left and top
    console.log(`before: ${this.element.style.left}`);
    this.element.style.left = `${this.left}px`;
    console.log(`afer: ${this.left}`);
  }

  move() {
    // Move the obstacle down by 3px
    this.top += 3;
    // Update the obstacle's position on the screen
    this.updatePosition();
  }
}
