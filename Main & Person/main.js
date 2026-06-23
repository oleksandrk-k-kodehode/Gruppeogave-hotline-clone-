import { Person } from "./Person.js";
import { Obstacle } from "./Obstacle.js";
import { EnemySpawner } from "../Enemy/Enemyspawner.js";

const gunshot = new Audio("./assets/sounds/gunshot.wav");
gunshot.volume = 0.1;

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
    console.log(canShoot);

    if (bullet) {
      canShoot = false;

      activeBullets.push({
        el: bullet,
        currentX: bullet.currentX,
        currentY: bullet.currentY,
        vx: bullet.vx,
        vy: bullet.vy,
      });
      gunshot.currentTime = 0;
      gunshot.play();
      renderObj(player);

      //*---------CHANGE BULLET SPPED IN PERSON.JS---------*//
      setTimeout(() => {
        canShoot = true;
      }, 100);
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

function gameLoop(time) {
  const dt = (time - lastTime) / 1000;
  lastTime = time;
  enemySpawner.update(dt, player);

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

  for (const bullet of activeBullets) {
    if (!bullet || !bullet.el) continue;

    bullet.currentX += bullet.vx;
    bullet.currentY += bullet.vy;

    bullet.el.style.left = bullet.currentX + "px";
    bullet.el.style.top = bullet.currentY + "px";
  }

  renderObj(player);

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
