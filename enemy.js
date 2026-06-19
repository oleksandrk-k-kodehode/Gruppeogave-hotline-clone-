import { Seekbehaviour } from "./Seekbehaviour.js";
import { map } from "./main.js";
import { Person } from "./Person.js";

const enemy = document.createElement("div");
enemy.classList = enemy;
enemy.imgSrc = "./assets/enemy/enemy-normal.png";
map.append(enemy);

class Enemy {
  constructor(x, y, speed = 4, damage, imgSrc, behaviour) {
    this.x = 0;
    this.y = 0;
    this.width = 50;
    this.speed = speed;
    this.damage = data.damage;
    this.health = data.health;
    this.behaviour = behaviour;
  }
  spawn(x, y) {
    this.x = x;
    this.y = y;
    this.health = this.data.health;
    this.active = true;
  }
  reset() {
    this.active = false;
    this.health = this.data.health;
  }
}
