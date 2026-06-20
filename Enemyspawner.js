import { enemyData } from "./Enemydata.js";
import { Enemy } from "./enemy.js";
import { SeekBehaviour } from "./SeekBehaviour.js";

const GAME_WIDTH = window.innerWidth;
const GAME_HEIGHT = window.innerHeight * 0.85;
const ENEMY_SPAWN_INTERVAL = 1;
const ENEMY_SPAWN_MARGIN = 3;

export class EnemySpawner {
  constructor(map) {
    this.map = map;
    this.spawnTimer = 0;
    this.spawnInterval = ENEMY_SPAWN_INTERVAL;
    this.enemies = [];
    this.enemyTypes = Object.keys(enemyData);
  }

  update(dt) {
    this.spawnTimer += dt;

    if (this.spawnTimer >= this.spawnInterval) {
      this.spawnWave();
      this.spawnTimer = 0;
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

    console.log("enemy spawned");
  }
}
