import { Person } from "./Person.js";
import { EnemySpawner } from "../Enemy/Enemyspawner.js";
import { Enemy } from "../Enemy/enemy.js";
import { enemyData } from "../Enemy/Enemydata.js";
import { gameOver } from "../Gameover.js";

const gunshot = new Audio("../assets/sounds/gunshot.wav");
gunshot.volume = 0.1;

const reload = new Audio("./assets/sounds/pistol/pistol-reload.mp3");
reload.volume = 0.3;

const map = document.getElementById("map");
const activeBullets = [];
let canShoot = true;

const createPlayer = (map, x, y, img) => {
  let mainFig = new Person(x, y, img);
  map.append(mainFig.entity);
  return mainFig;
};

const player = createPlayer(map, 10, 10, "./assets/player/player-default.png");

const enemySpawner = new EnemySpawner(map, activeBullets);

const keys = {
  ArrowUp: false,
  KeyW: false,
  ArrowDown: false,
  KeyS: false,
  ArrowLeft: false,
  KeyA: false,
  ArrowRight: false,
  KeyD: false,
  Space: false,
  KeyR: false,
};

const renderObj = (obj) => {
  obj.entity.style.left = obj.x + "px";
  obj.entity.style.top = obj.y + "px";
  obj.aim();
};

const shoot = document.addEventListener("keydown", (k) => {
  if (k.code in keys) {
    keys[k.code] = true;
    k.preventDefault();
  }

  if (k.code === "Space" && canShoot) {
    const bullet = player.shoot();

    if (bullet) {
      canShoot = false;

      activeBullets.push({
        el: bullet,
        currentX: bullet.currentX,
        currentY: bullet.currentY,
        vx: bullet.vx,
        vy: bullet.vy,
        owner: player,
      });
      gunshot.currentTime = 0;
      gunshot.play();
      renderObj(player);

      //*---------CHANGE BULLET SPPED IN PERSON.JS---------*//
      setTimeout(() => {
        canShoot = true;
      }, 96);
    }
  }
});

document.addEventListener("keyup", (k) => {
  if (k.code in keys) keys[k.code] = false;
});

document.addEventListener("mousemove", (e) => {
  player.mouseX = e.pageX;
  player.mouseY = e.pageY;
  player.aim();
});

let lastTime = performance.now();

window.ammoElement = document.querySelector(".ammo");
window.cashElement = document.querySelector(".cash");
window.healthElement = document.querySelector(".life");
window.killElement = document.querySelector(".score");
window.cashElement.textContent = 0;
window.healthElement.textContent = 1;
window.killElement.textContent = 0;

function gameLoop(time) {
  const dt = (time - lastTime) / 1000;
  lastTime = time;
  enemySpawner.update(dt, player);
  window.ammoElement.textContent = player.ammoMag;

  if (keys.KeyW || keys.ArrowUp) {
    player.direction = "forwards";
    player.move();
  }

  if (keys.KeyS || keys.ArrowDown) {
    player.direction = "backwards";
    player.move();
  }

  if (keys.KeyA || keys.ArrowLeft) {
    player.direction = "left";
    player.move();
  }

  if (keys.KeyD || keys.ArrowRight) {
    player.direction = "right";
    player.move();
  }

  ammo.style.scale = 1;
  if (keys.KeyR) {
    if (player.ammoMag < 6) {
      player.ammoMag = 6;
      reload.currentTime = 0;
      reload.play();
      ammo.style.scale = 1.2;
    }
  }

  for (const bullet of activeBullets) {
    if (!bullet || !bullet.el) continue;

    bullet.currentX += bullet.vx;
    bullet.currentY += bullet.vy;

    bullet.el.style.left = bullet.currentX + "px";
    bullet.el.style.top = bullet.currentY + "px";
    if (bullet.owner !== player && player.checkCollision(bullet)) {
      player.death();
      gameOver();
      !gameLoop();
      window.healthElement.textContent = 0;
    }

    for (const enemy of enemySpawner.enemies) {
      if (bullet.owner == player && enemy.checkCollision(bullet)) {
        enemy.death();
        window.killElement.textContent++;
        let enemyIndex = enemySpawner.enemies.indexOf(enemy);
        enemySpawner.enemies.splice(enemyIndex, 1);
      }
    }
  }

  renderObj(player);
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
