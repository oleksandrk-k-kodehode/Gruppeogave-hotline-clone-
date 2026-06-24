import { Bullet } from "../Main & Person/Bullet.js";
import { enemyData } from "../Enemy/Enemydata.js";

const gunshot = new Audio("../assets/sounds/gunshot.wav");
gunshot.volume = 0.1;

export class Enemy {
  constructor(x, y, width, height, speed, behaviour, image) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.behaviour = behaviour;

    this.shootRange = 220;
    this.shootCooldown = 1.2;
    this.shootTimer = 0;

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

  shoot(player, activeBullets) {
    const angle = Math.atan2(player.y - this.y, player.x - this.x);

    const bullet = new Bullet(this.x, this.y, enemyData.bulletImg);
    const el = bullet.buildBullet();
    gunshot.currentTime = 0;
    gunshot.play();

    const bulletObj = {
      el,
      currentX: this.x,
      currentY: this.y,
      vx: Math.cos(angle) * 8,
      vy: Math.sin(angle) * 8,
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
    this.entity.remove();
    this.dead = true;
  }
}
