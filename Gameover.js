export function gameOver() {
  const gameOver = document.getElementById("game-over-overlay");
  gameOver.style.display = "block";

  const reset = document.querySelector(".reset");
  reset.addEventListener("click", () => {
    window.location.reload();
  });

  const score = document.querySelector(".score");
  window.killElement.textContent = 1;
}
