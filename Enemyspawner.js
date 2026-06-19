import { enemyData } from "./Enemydata";

const GAME_WIDTH = 1280;
const GAME_HEIGHT = 720;
const ENEMY_SPAWN_INTERVAL = 2;
const ENEMY_SPAWN_MARGIN = 200;
const ENEMY_DESPAWN_MARGIN = 300;

export class EnemySpawner {
  constructor(enemyManager) {
    this.enemyManager = enemyManager;
    this.spawnTimer = 0;
    this.spawnInterval = ENEMY_SPAWN_INTERVAL;

    this.enemyTypes = [];
    for (const type in enemyData) {
      this.enemyTypes.push(type);
    }
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
    this.enemyManager.spawn(type, x, y);
  }
  reset() {
    this.spawnTimer = 0;
  }
}
