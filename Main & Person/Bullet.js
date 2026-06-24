class Bullet {
  constructor(
    x,
    y,
    img = "./assets/bullet.png",
    identity = "bullet",
    width = 2,
    height = 4.5,
  ) {
    this.x = x;
    this.y = y;

    this.width = width;
    this.height = height;

    this.img = img;
    this.identity = identity;
  }

  buildBullet() {
    const bullet = document.createElement("div");
    bullet.className = "bullet";
    bullet.style.position = "absolute";
    bullet.style.width = `${this.width}px`;
    bullet.style.height = `${this.height}px`;

    const bulletImg = new Image();
    bulletImg.src = this.img;
    bulletImg.style.width = `${this.width}px`;
    bulletImg.style.height = `${this.height}px`;

    bullet.append(bulletImg);
    return bullet;
  }
}

export { Bullet };
