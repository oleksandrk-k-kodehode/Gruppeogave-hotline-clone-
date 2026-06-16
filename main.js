import { Person } from "./Person.js";
import { Obstacle } from "./Obstacle.js";

window.addEventListener(
  "keydown",
  function (e) {
    if (
      ["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(
        e.code,
      ) > -1
    ) {
      e.preventDefault();
    }
  },
  false,
);
const map = document.getElementById("map");

const createPlayer = (map, x, y, img) => {
  let mainFig = new Person(x, y, img);
  map.append(mainFig.entity);
  return mainFig;
};
const player = createPlayer(map, 10, 10, "./assets/player/player-default.png");

const keys = {
  ArrowUp: false,
  KeyW: false,
  ArrowDown: false,
  KeyS: false,
  ArrowLeft: false,
  KeyA: false,
  ArrowRight: false,
  KeyD: false,
};

document.addEventListener("keydown", (k) => {
  if (k.code in keys) keys[k.code] = true;
  if (k.code === "Space") player.shoot();
});

document.addEventListener("keyup", (k) => {
  if (k.code in keys) keys[k.code] = false;
});

document.addEventListener("click", (e) => {
  ((player.mouseX = e.pageX), (player.mouseY = e.pageY));
  player.aim();
});

function gameLoop() {
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

  player.entity.style.left = player.x + "px";
  player.entity.style.top = player.y + "px";

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
