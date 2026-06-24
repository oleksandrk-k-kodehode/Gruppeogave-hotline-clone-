import { enemyData } from "../Enemy/Enemydata.js";
import { Enemy } from "../Enemy/enemy.js";
import { SeekBehaviour } from "../Enemy/Seekbehaviour.js";

export const GAME_WIDTH = window.innerWidth;
export const GAME_HEIGHT = window.innerHeight * 0.85;
const ENEMY_SPAWN_INTERVAL = 2;
const ENEMY_SPAWN_MARGIN = 10;
const ENEMY_SHOOT_RANGE = 300;
const ENEMY_SHOOT_INTERVAL = 0.1;

export class EnemySpawner {
  constructor(map, activeBullets) {
    this.map = map;
    this.spawnTimer = 0;
    this.activeBullets = activeBullets;
    this.spawnInterval = ENEMY_SPAWN_INTERVAL;
    this.enemies = [];
    this.enemyTypes = Object.keys(enemyData);
  }

  update(dt, player) {
    this.spawnTimer += dt;

    if (this.spawnTimer >= this.spawnInterval) {
      this.spawnWave();
      this.spawnTimer = 0;
    }

    for (const enemy of this.enemies) {
      enemy.update(dt, player, this.activeBullets);
    }
  }

  spawnWave() {
    const type =
      this.enemyTypes[Math.floor(Math.random() * this.enemyTypes.length)];

    const data = enemyData[type];

    let x;
    let y;

    x = Math.random() * GAME_WIDTH;
    y = -ENEMY_SPAWN_MARGIN;

    const enemy = new Enemy(
      x,
      y,
      data.width,
      data.height,
      data.speed,
      new SeekBehaviour(),
      data.image,
    );

    this.map.append(enemy.entity);
    this.enemies.push(enemy);
  }
}
