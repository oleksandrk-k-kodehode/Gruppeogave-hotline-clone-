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
    #recoil(angle, recoilDist = 3) {
        this.entity.style.left = `${this.x + Math.cos((angle * Math.PI) / 180) * recoilDist}px`;
        this.entity.style.top = `${this.y + Math.sin((angle * Math.PI) / 180) * recoilDist}px`;
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
        bulletElem.style.left = this.centerX + player.width + "px";
        bulletElem.style.top = this.centerY + player.width + "px";
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
        this.#recoil(this.angle);

        const mapElement = document.getElementById("map");
        if (mapElement) mapElement.append(bulletElem);
        return bulletElem;
    }
}

export { Person };
