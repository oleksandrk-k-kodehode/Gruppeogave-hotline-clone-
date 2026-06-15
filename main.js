import { Person } from "./Person.js";
import { Obstacle } from "./Obstacle.js";

const map = document.getElementById("map");

const createPlayer = (map, x, y, img) => {
    let mainFig = new Person(x, y, img);
    map.append(mainFig.entity);
    return mainFig;
};
createPlayer(map, 10, 10, "./assets/player/player-default.png");

// const player = new Person("./assets/player/player-default.png", null, 100, 100);

// const keys = {};

// document.addEventListener("keydown", (e) => {
//     keys[e.code] = true;
// });

// document.addEventListener("keyup", (e) => {
//     keys[e.code] = false;
// });

function gameLoop() {
    if (keys["KeyW"]) player.y -= player.speed;
    if (keys["KeyS"]) player.y += player.speed;
    if (keys["KeyA"]) player.x -= player.speed;
    if (keys["KeyD"]) player.x += player.speed;

    player.entity.style.left = player.x + "px";
    player.entity.style.top = player.y + "px";

    requestAnimationFrame(gameLoop);
}

gameLoop();
