import { Obstacle } from "./Obstacle.js";

const map = document.getElementById("map");

const cactus = new Obstacle(40, 40, "./assets/cactus.png");

map.append(cactus.imageElement);
