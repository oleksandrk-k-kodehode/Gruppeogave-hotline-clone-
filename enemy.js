export class Enemy {
  constructor(x, y, width, height, speed, behaviour, image) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.behaviour = behaviour;

    this.entity = document.createElement("img");
    this.entity.src = image;
    this.entity.style.position = "absolute";
    this.entity.style.width = `${width}px`;
    this.entity.style.height = `${height}px`;
    this.entity.style.left = `${x}px`;
    this.entity.style.top = `${y}px`;
  }

  update(dt, player) {
    this.behaviour.update(this, dt, player);

    this.entity.style.left = `${this.x}px`;
    this.entity.style.top = `${this.y}px`;
  }

  destroy() {
    this.entity.remove();
  }
}
