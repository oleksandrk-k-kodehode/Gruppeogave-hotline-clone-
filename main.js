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

document.addEventListener("keydown", (e) => {
  switch (e.code) {
    case "KeyW":
    case "ArrowUp":
      player.direction = "forwards";
      player.move();
      break;

    case "KeyS":
    case "ArrowDown":
      player.direction = "backwards";
      player.move();
      break;

    case "KeyA":
    case "ArrowLeft":
      player.direction = "left";
      player.move();
      break;

    case "KeyD":
    case "ArrowRight":
      player.direction = "right";
      player.move();
      break;
  }

  player.entity.style.left = player.x + "px";
  player.entity.style.top = player.y + "px";
});
