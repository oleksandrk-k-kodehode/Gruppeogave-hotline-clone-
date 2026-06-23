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
        this.screamEmpty = new Audio();
        this.screamEmpty.src = "./assets/sounds/i-need-more-bullets.mp3";
        this.screamEmpty.volume = 0.1;
        this.screamDeath = new Audio();
        this.screamDeath.src = "./assets/sounds/disappear-scream.mp3";
        this.screamDeath.volume = 0.03;

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
        this.map = window.getComputedStyle(document.getElementById("map"));
        this.mapHeight = Number(
            this.map.getPropertyValue("height").slice(0, -2),
        );
        this.mapWidth = Number(this.map.getPropertyValue("width").slice(0, -2));
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
        } else {
            this.#returnOnMap(this);
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

    #returnOnMap(obj, limit = 10) {
        if (obj.centerX <= limit) {
            obj.x = limit;
        } else if (obj.centerX >= this.mapWidth) {
            obj.x = this.mapWidth - this.width;
        } else if (obj.centerY <= limit) {
            obj.y = limit;
        } else if (obj.centerY >= this.mapHeight) {
            obj.y = this.mapHeight - this.width;
        }
    }

    #checkInMap(obj) {
        this.#SEtXY();

        if (obj.centerX > 10 && obj.centerX < this.mapWidth) {
            if (obj.centerY > 10 && obj.centerY < this.mapHeight) {
                return true;
            }
        }
        return false;
    }

    checkCollision(xeno) {
        let centerXX = xeno.currentX;
        let centerXY = xeno.currentY;
        if (centerXX > this.x && centerXX < this.x + this.width) {
            if (centerXY > this.y && centerXY < this.y + this.width) {
                return true;
            }
        }
        return false;
    }

    death() {
        this.screamDeath.currentTime = 0;
        this.screamDeath.play();
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
            this.screamEmpty.currentTime = 0;
            this.screamEmpty.play();
        }
        this.entity.style.top = this.y + "px";
        this.entity.style.left = this.x + "px";
    }
}

export { Person };
