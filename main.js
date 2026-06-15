import { Person } from "./Person.js";
import { Obstacle } from "./Obstacle.js";

const map = document.getElementById("map");

const createPlayer = (map, x, y, img) => {
    let mainFig = new Person(x, y, img);
    map.append(mainFig.entity);
    return mainFig;
};
createPlayer(map, 10, 10, "./assets/player/player-default.png");
