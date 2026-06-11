const player = document.getElementById("player");

let speed = 8;
let x = 300;
let y = 0;

document.addEventListener("keydown", (k) => {
  if (k.code == "KeyD") {
    x += speed;
    player.style.left = `${x}px`;
  }
  if (k.code == "KeyA") {
    x -= speed;
    player.style.left = `${x}px`;
  }
  if (k.code == "KeyS") {
    y += speed;
    player.style.top = `${y}px`;
  }
  if (k.code == "KeyW") {
    y -= speed;
    player.style.top = `${y}px`;
  }
});
