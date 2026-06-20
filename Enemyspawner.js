import { enemyData } from "./Enemydata";
import { Enemy } from "./enemy";

const GAME_WIDTH = 1280;
const GAME_HEIGHT = 720;
const ENEMY_SPAWN_INTERVAL = 2;
const ENEMY_SPAWN_MARGIN = 200;
const ENEMY_DESPAWN_MARGIN = 300;

export class EnemySpawner {
  constructor() {
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
    const edge = Math.floor(Math.random() * 4);
    let x, y;

    switch (edge) {
      case 0: // top
        x = Math.random() * GAME_WIDTH;
        y = -ENEMY_SPAWN_MARGIN;
        break;

      case 1: // right
        x = GAME_WIDTH + ENEMY_SPAWN_MARGIN;
        y = Math.random() * GAME_HEIGHT;
        break;

      case 2: // bottom
        x = Math.random() * GAME_WIDTH;
        y = GAME_HEIGHT + ENEMY_SPAWN_MARGIN;
        break;

      case 3: // left
        x = -ENEMY_SPAWN_MARGIN;
        y = Math.random() * GAME_HEIGHT;
        break;
    }

    const data = enemyData[type];

    const enemy = new Enemy(
      x,
      y,
      data.width,
      data.height,
      data.speed,
      new SeekBehaviour(),
      data.image,
    );

    this.enemies.push(enemy);
  }

  reset() {
    this.spawnTimer = 0;
    this.enemies.length = 0;
  }
}
