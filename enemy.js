import { Seekbehaviour } from "./Seekbehaviour.js";
import { map } from "./main.js";
import { Person } from "./Person.js";
import { EnemySpawner } from "./Enemyspawner.js";

const enemy = document.createElement("div");
enemy.classList = enemy;
enemy.imgSrc = "./assets/enemy/enemy-normal.png";
map.append(enemy);

//----data er stored i Enemydata//
class Enemy {
  constructor(data, behaviour) {
    this.data = data;
    this.behaviour = behaviour;
    this.x = 0;
    this.y = 0;
    this.width = data.width;
    this.speed = data.speed;
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
  update() {
    this.behaviour.update(this, dt, player);
  }
}
