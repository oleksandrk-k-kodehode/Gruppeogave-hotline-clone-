import { Bullet } from "../Main & Person/Bullet.js";
import { enemyData } from "../Enemy/Enemydata.js";

const gunshot = new Audio("../assets/sounds/gunshot.wav");
gunshot.volume = 0.1;

export class Enemy {
    constructor(
        x,
        y,
        width,
        height,
        speed,
        behaviour,
        image,
        bulletImg,
        deathImg,
    ) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.behaviour = behaviour;
        this.centerX = 0;
        this.centerY = 0;

        this.shootRange = 220;
        this.shootCooldown = 0.1;
        this.shootTimer = 0;

        this.bulletImg = bulletImg;
        this.deathImg = deathImg;
        this.map = document.getElementById("map");

        this.entity = document.createElement("img");
        this.entity.src = image;
        this.entity.style.position = "absolute";
        this.entity.style.width = `${width}px`;
        this.entity.style.height = `${height}px`;
        this.entity.style.left = `${x}px`;
        this.entity.style.top = `${y}px`;
    }

    update(dt, player, activeBullets) {
        if (this.dead) return;
        this.behaviour.update(this, dt, player);

        this.shootTimer += dt;

        const dx = player.x - this.x;
        const dy = player.y - this.y;
        const dist = Math.hypot(dx, dy);

        if (dist <= this.shootRange && this.shootTimer >= this.shootCooldown) {
            this.shoot(player, activeBullets);
            this.shootTimer = 0;
        }

        this.entity.style.left = `${this.x}px`;
        this.entity.style.top = `${this.y}px`;
    }

    #calcAngle(x1, x2, y1, y2) {
        let angle = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;
        return angle;
    }

    #calCenter(side, width) {
        return side + width / 2;
    }

    #SEtXY() {
        this.centerX = this.#calCenter(this.x, this.width);
        this.centerY = this.#calCenter(this.y, this.width);
    }

    shoot(player, activeBullets) {
        this.#SEtXY();
        this.angle = Math.atan2(
            player.centerY - this.centerY,
            player.centerX - this.centerX,
        );
        let bulletAngle = this.#calcAngle(
            this.centerX,
            player.centerX,
            this.centerY,
            player.centerY,
        );

        const bullet = new Bullet(this.x, this.y, this.bulletImg, bulletAngle);
        const el = bullet.buildBullet();
        gunshot.currentTime = 0;
        gunshot.play();

        const bulletObj = {
            el,
            currentX: this.centerX,
            currentY: this.centerY,
            vx: Math.cos(this.angle) * 8,
            vy: Math.sin(this.angle) * 8,
        };

        activeBullets.push(bulletObj);
        this.map.append(el);
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
        this.dead = true;

        const death = document.createElement("img");
        death.src = "Assets/death-animate/death-animation.png";

        death.style.position = "absolute";
        death.style.left = `${this.x}px`;
        death.style.top = `${this.y}px`;
        death.style.width = `${this.width}px`;
        death.style.height = `${this.height}px`;

        this.map.append(death);

        setTimeout(() => {
            death.src = "Assets/death-animate/death-animation-2.png";
        }, 300);

        setTimeout(() => {
            death.src = "Assets/death-animate/death-animation-3.png";
        }, 500);

        setTimeout(() => {
            death.remove();
        }, 600);

        this.entity.remove();
    }
}
