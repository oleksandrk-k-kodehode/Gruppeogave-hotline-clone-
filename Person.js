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
        this.ammoMag = 15;
        this.scream = new Audio();
        this.scream.src = "./assets/sounds/i-need-more-bullets.mp3";
        this.scream.volume = 0.1;

        this.upperbodyImg = upperbody;
        this.width = 30;

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
        console.log("X: " + this.x, "Y: " + this.y);
        console.log(this.#checkInMap(this));
        if (this.#checkInMap(this)) {
            if (this.direction === "backwards") {
                this.y += this.speed;
            } else if (this.direction === "forwards") {
                this.y -= this.speed;
            } else if (this.direction === "left") {
                this.x -= this.speed;
            } else if (this.direction === "right") {
                this.x += this.speed;
            }
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
        this.angle = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;
        return this.angle;
    }

    #calCenter(side, width) {
        return side + width / 2;
    }

    #SEtXY() {
        this.centerX = this.#calCenter(this.x, this.width);
        this.centerY = this.#calCenter(this.y, this.width);
    }

    #recoil(angle = this.angle, recoilDist = 3) {
        this.x -= Math.cos((angle * Math.PI) / 180) * recoilDist;
        this.y -= Math.sin((angle * Math.PI) / 180) * recoilDist;

        this.entity.style.top = this.y + "px";
        this.entity.style.left = this.x + "px";
    }

    #checkInMap(obj) {
        this.#SEtXY();
        const map = window.getComputedStyle(document.getElementById("map"));
        const mapHeight = Number(map.getPropertyValue("height").slice(0, -2));
        console.log("mapH: " + mapHeight);
        const mapWidth = Number(map.getPropertyValue("width").slice(0, -2));
        console.log("mapW: " + mapWidth);

        if (obj.centerX >= 0 && obj.centerX <= mapWidth) {
            if (obj.centerY >= 0 && obj.centerY <= mapHeight) {
                return true;
            }
        }
        return false;
    }

    aim() {
        this.#SEtXY();
        let rotation = this.#calcAngle(
            this.centerX,
            this.mouseX,
            this.centerY,
            this.mouseY,
        );
        this.upperBody.style.transform = `rotate(${rotation}deg)`;
    }

    shoot() {
        this.#SEtXY();
        if (this.ammoMag > 0) {
            const bulletEl = new Bullet(
                this.centerX,
                this.centerY,
                "./assets/bullet.png",
            );
            const bulletElem = bulletEl.buildBullet();
            bulletElem.style.position = "absolute";
            bulletElem.style.left = this.centerX + player.width + "px";
            bulletElem.style.top = this.centerY + player.width + "px";
            bulletElem.style.transform = `rotate(${this.angle}deg)`;

            const angle = Math.atan2(
                this.mouseY - this.centerY,
                this.mouseX - this.centerX,
            );
            const bulletSpeed = 15;

            bulletElem.currentX = this.centerX;
            bulletElem.currentY = this.centerY;
            bulletElem.vx = Math.cos(angle) * bulletSpeed;
            bulletElem.vy = Math.sin(angle) * bulletSpeed;
            this.#recoil();
            this.ammoMag--;

            const mapElement = document.getElementById("map");
            if (mapElement) mapElement.append(bulletElem);
            return bulletElem;
        } else {
            this.scream.currentTime = 0;
            this.scream.play();
        }
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
    this.angle = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;
    return this.angle;
  }

  #calCenter(side, width) {
    return side + width / 2;
  }

  #setXY() {
    this.centerX = this.#calCenter(this.x, this.width);
    this.centerY = this.#calCenter(this.y, this.width);
  }

  recoil(angle = this.angle, recoilDist = 3) {
    this.x += Math.cos((angle * Math.PI) / 180) * recoilDist;
    this.y += Math.sin((angle * Math.PI) / 180) * recoilDist;

    this.entity.style.left = this.x + "px";
    this.entity.style.top = this.y + "px";
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
    const bulletSpeed = 24;

    bulletElem.currentX = this.centerX;
    bulletElem.currentY = this.centerY;
    bulletElem.vx = Math.cos(angle) * bulletSpeed;
    bulletElem.vy = Math.sin(angle) * bulletSpeed;
    this.recoil();

    const mapElement = document.getElementById("map");
    if (mapElement) mapElement.append(bulletElem);
    return bulletElem;
  }
}

export { Person };
