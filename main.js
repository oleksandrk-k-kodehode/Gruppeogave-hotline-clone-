import { Obstacle } from "./Obstacle";

const map = document.getElementById("map");

const cactus = new Obstacle("80px", "80px", "./assets/cactus.png");

const map = document.getElementById("map");
map.append(cactus.imageElement);
