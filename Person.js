import { Bullet } from "./Bullet.js";
class Person {
    constructor(
        x,
        y,
        upperbody,
        direction = "forward",
        speed = 3,
        role = "player",
    ) {
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.speed = speed;
        this.angle = 0;

        this.upperbodyImg = upperbody;
        this.width = 50;

        this.mouseX = x;
        this.mouseY = y;

        this.role = role;
        [this.entity, this.upperBody] = this.build(this.role);
        this.entity.style.top = this.y + "px";
        this.entity.style.left = this.x + "px";
        this.centerX = 0;
        this.centerY = 0;
    }

    build(identity) {
        const entity = document.createElement("div");
        entity.id = identity;

        const upperBody = new Image();
        upperBody.src = this.upperbodyImg;
        upperBody.style.height = `${this.width}px`;
        upperBody.style.width = `${this.width}px`;
        upperBody.id = "upperBody";

        entity.append(upperBody);
        entity.style.height = `${this.width}px`;
        entity.style.width = `${this.width}px`;

        return [entity, upperBody];
    }

    move() {
        if (this.direction === "backwards") {
            this.y += this.speed;
        } else if (this.direction === "forwards") {
            this.y -= this.speed;
        } else if (this.direction === "left") {
            this.x -= this.speed;
        } else if (this.direction === "right") {
            this.x += this.speed;
        }
        this.entity.style.top = this.y + "px";
        this.entity.style.left = this.x + "px";
    }

    #calcDistance(y2, y1, x2, x1) {
        let deltaX = x2 - x1;
        let deltaY = y2 - y1;
        return Math.hypot(deltaX, deltaY);
    }

    #calcAngle(x1, x2, y1, y2) {
        return (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;
    }

    #calCenter(side, width) {
        return side + width / 2;
    }

    #setXY() {
        this.centerX = this.#calCenter(this.x, this.width);
        this.centerY = this.#calCenter(this.y, this.width);
    }

    aim() {
        this.#setXY();
        let rotation = this.#calcAngle(
            this.centerX,
            this.mouseX,
            this.centerY,
            this.mouseY,
        );
        this.upperBody.style.transform = `rotate(${rotation}deg)`;
    }

    shoot() {
        this.#setXY();

        const bulletEl = new Bullet(
            this.centerX,
            this.centerY,
            "./assets/bullet.png",
        );
        const bulletElem = bulletEl.buildBullet();
        bulletElem.style.position = "absolute";
        bulletElem.style.left = this.centerX + "px";
        bulletElem.style.top = this.centerY + "px";
        bulletElem.style.transform = `rotate(${this.angle}deg)`;

        const angle = Math.atan2(
            this.mouseY - this.centerY,
            this.mouseX - this.centerX,
        );
        const bulletSpeed = 10;

        bulletElem.currentX = this.centerX;
        bulletElem.currentY = this.centerY;
        bulletElem.vx = Math.cos(angle) * bulletSpeed;
        bulletElem.vy = Math.sin(angle) * bulletSpeed;

        const mapElement = document.getElementById("map");
        if (mapElement) mapElement.append(bulletElem);
        return bulletElem;
    }
    this.entity.style.top = this.y + "px";
    this.entity.style.left = this.x + "px";
  }

  #bulletBuild(x, y, img, speed, damage, width, height) {
    const bullet = document.createElement("div");
    bullet.className = "bullet";
    bullet.style.position = "absolute";
    bullet.style.width = `${width}px`;
    bullet.style.height = `${height}px`;

    const bulletImg = new Image();
    bulletImg.src = img;

    bullet.append(bulletImg);
    return bullet;
  }

  #calcDistance(y2, y1, x2, x1) {
    let deltaX = x2 - x1;
    let deltaY = y2 - y1;
    return Math.hypot(deltaX, deltaY);
  }

  #calcAngle(x1, x2, y1, y2) {
    return (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;
  }

  aim() {
    this.centerX = this.x + this.width / 2;
    this.centerY = this.y + this.width / 2;
    let rotation = this.#calcAngle(
      this.centerX,
      this.mouseX,
      this.centerY,
      this.mouseY,
    );
    this.upperBody.style.transform = `rotate(${rotation}deg)`;
  }

  shoot() {
    const centerX = this.x + this.width / 2;
    const centerY = this.y + this.width / 2;

    const bullet = this.#bulletBuild(
      centerX,
      centerY,
      "./assets/bullet.png",
      8,
      10,
      10,
      10,
    );

    bullet.style.position = "absolute";
    bullet.style.left = centerX + "px";
    bullet.style.top = centerY + "px";

    const angle = Math.atan2(this.mouseY - centerY, this.mouseX - centerX);
    const bulletSpeed = 10;

    bullet.currentX = centerX;
    bullet.currentY = centerY;
    bullet.vx = Math.cos(angle) * bulletSpeed;
    bullet.vy = Math.sin(angle) * bulletSpeed;

    const map = document.getElementById("map");
    if (map) map.append(bullet);
    return bullet;
  }
}

export { Person };
