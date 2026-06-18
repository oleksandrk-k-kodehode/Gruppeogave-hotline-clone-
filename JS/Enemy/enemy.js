import { Seekbehaviour } from "./Seekbehaviour.js";
import { map } from "./main.js";
import { Person } from "../Player/Person.js";

const enemy = document.createElement("div");
enemy.classList = enemy;
enemy.imgSrc = "./assets/enemy/enemy-normal.png";
map.append(enemy);

class enemy {
  constructor(x, y, speed = 4, damage, imgSrc) {
    this.x = 0;
    this.y = 0;
    this.width = 50;
    this.speed = speed;
    this.damage = data.damage;
    this.health = data.health;
    this.behaviourType = "?";
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
