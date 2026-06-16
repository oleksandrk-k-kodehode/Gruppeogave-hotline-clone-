import { Person } from "./Person.js";
import { Obstacle } from "./Obstacle.js";

<<<<<<< HEAD
document.addEventListener(
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
=======
window.addEventListener(
    "keydown",
    function (e) {
        if (
            [
                "Space",
                "ArrowUp",
                "ArrowDown",
                "ArrowLeft",
                "ArrowRight",
            ].indexOf(e.code) > -1
        ) {
            e.preventDefault();
        }
    },
    false,
>>>>>>> 924cd20a684ca2d0794c95d5eef7f789a25e9ac7
);
const map = document.getElementById("map");

function gameloop() {
  requestAnimationFrame;
}

const createPlayer = (map, x, y, img) => {
    let mainFig = new Person(x, y, img);
    map.append(mainFig.entity);
    return mainFig;
};
const player = createPlayer(map, 10, 10, "./assets/player/player-default.png");

document.addEventListener("keydown", (e) => {
<<<<<<< HEAD
  switch (e.code) {
    case "KeyW":
    case "ArrowUp":
      player.direction = "forwards";
      player.move();
      break;
=======
    console.log(e.code);
    switch (e.code) {
        case "KeyW":
        case "ArrowUp":
            player.direction = "forwards";
            player.move();
            break;
>>>>>>> 924cd20a684ca2d0794c95d5eef7f789a25e9ac7

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

<<<<<<< HEAD
  requestAnimationFrame(gameloop);

  player.entity.style.left = player.x + "px";
  player.entity.style.top = player.y + "px";
=======
    player.entity.style.left = player.x + "px";
    player.entity.style.top = player.y + "px";
});

document.addEventListener("mousemove", (e) => {
    ((player.mouseX = e.pageX), (player.mouseY = e.pageY));
    player.aim();
>>>>>>> 924cd20a684ca2d0794c95d5eef7f789a25e9ac7
});

gameloop();
