import { Person } from "./Person";

let speed = 8;
let x = 300;
let y = 0;

const player = new Person("./assets/player-default.png", x, y);

document.addEventListener("keydown", (k) => {
    if (k.code == "KeyD") {
        // x += speed;
        // player.style.left = `${x}px`;
        player.rotate(player.upperbodyImg, "right");
    }
    if (k.code == "KeyA") {
        // x -= speed;
        // player.style.left = `${x}px`;
        player.rotate(player.upperbodyImg, "left");
    }
    if (k.code == "KeyS") {
        // y += speed;
        // player.style.top = `${y}px`;
        player.direction = "backwards";
        player.move();
    }
    if (k.code == "KeyW") {
        // y -= speed;
        // player.style.top = `${y}px`;
        player.direction = "up";
        player.move();
    }
});
