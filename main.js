import { Obstacle } from "./Obstacle";

const cactus = new Obstacle("80px", "80px", "./assets/cactus.png");

const map = document.getElementById("map");
map.append(cactus);
