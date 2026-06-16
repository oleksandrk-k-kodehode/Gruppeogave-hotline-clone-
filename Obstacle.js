class Obstacle {
  constructor(x, y, image) {
    this.x = x;
    this.y = y;
    this.imageElement = this.#build(image);
  }

  distance(x, y) {
    return Math.hypot(x - this.x, y - this.y);
  }

  #build(image) {
    const imageElement = document.createElement("img");
    imageElement.src = image;

    return imageElement;
  }

  collisions() {
    let distanceToCharacter = distance(this.x);
  }
}

export { Obstacle };
