export class Enemy {
  constructor(x, y, width, height, speed, behaviour, image) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.behaviour = behaviour;
    this.image = image;
  }

  update(dt, player) {
    this.behaviour.update(this, dt, player);
  }

  draw(ctx) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}
