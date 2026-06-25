export function gameOver() {
  const gameOver = document.getElementById("game-over-overlay");
  gameOver.style.display = "block";

  const score = document.getElementById("total-score");
  score.textContent = localStorage.getItem("lastScore") || 0;
  window.killElement.textContent = "";

  const reset = document.querySelector(".reset");
  reset.addEventListener("click", () => {
    window.location.reload();
  });
}
