export class Seekbehaviour {
  update(enemy, dt, player) {
    const dx = player.x + player.width / 2 - (enemy.x + enemy.width / 2);
    const dy = player.y + player.height / 2 - (enemy.x + enemy.height / 2);
    const len = Math.sqrt(dx * dx + dy * dy);
    if (len > 0) {
      const normalizedDx = dx / len;
      const normalizedDy = dy / len;

      enemy.x += normalizedDx * enemy.speed * dt;
      enemy.y += normalizedDy * enemy.speed * dt;
    }
  }
}
