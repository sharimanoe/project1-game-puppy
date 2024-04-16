class Obstacles extends Component {
  constructor(gameScreen, imgSrc) {
    super(
      gameScreen,
      Math.floor(Math.random() * 300 + 70),
      0,
      100,
      150,
      imgSrc
    );
    // this.friendly = () => {
    //   if (this.element.id === "img-cat") {
    //     return false;
    //   } else {
    //     return true;
    //   }
    // };
    this.friendly = this.imgSrc !== "/assets/cat.png";
  }
  // this.width = 805;
  // this.height = 792;
  // this.element = document.getElementsByClassName(typeObstacle)[0];

  move() {
    this.top += 3;
    this.updatePosition();
  }

  updatePosition() {
    // Update the obstacle's position based on the properties left and top
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  }
}
