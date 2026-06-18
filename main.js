import { Person } from "./Person.js";
import { Obstacle } from "./Obstacle.js";

const gunshot = new Audio("./assets/sounds/cartoon-sfx-gunshot_E_minor.wav");
gunshot.volume = 0.1;

const map = document.getElementById("map");

const createPlayer = (map, x, y, img) => {
    let mainFig = new Person(x, y, img);
    map.append(mainFig.entity);
    return mainFig;
};
const player = createPlayer(
    map,
    10,
    10,
    "./assets/player/player-default_copy.png",
);

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

const activeBullets = [];

const shoot = document.addEventListener("keydown", (k) => {
    if (k.code in keys) {
        keys[k.code] = true;
        k.preventDefault();
    }

    if (k.code === "Space") {
        const bullet = player.shoot();
        if (bullet) {
            activeBullets.push(bullet);
            player.move(-player.direction);
            setTimeout(() => player.shoot, 3000);
        }
    }
});

document.addEventListener("keyup", (k) => {
    if (k.code in keys) keys[k.code] = false;
});

document.addEventListener("mousemove", (e) => {
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

    for (let i = activeBullets.length - 1; i >= 0; i--) {
        const bullet = activeBullets[i];

        bullet.currentX += bullet.vx;
        bullet.currentY += bullet.vy;

        bullet.style.left = bullet.currentX + "px";
        bullet.style.top = bullet.currentY + "px";

        if (
            bullet.currentX < -100 ||
            bullet.currentX > window.innerWidth + 100 ||
            bullet.currentY < -100 ||
            bullet.currentY > window.innerHeight + 100
        ) {
            bullet.remove();
            activeBullets.splice(i, 1);
        }
    }

    player.entity.style.left = player.x + "px";
    player.entity.style.top = player.y + "px";
    player.aim();
    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
