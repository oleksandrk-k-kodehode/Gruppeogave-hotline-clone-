export class Seekbehaviour {
  update(enemy, dt, player) {
    const dx = player.x - enemy.x;
    const dy = player.y - enemy.y;
    const len = Math.sqrt(dx * dx + dy * dy);
    if (len > 0) {
      const normalizedDx = dx / len;
      const normalizedDy = dy / len;

      enemy.x += normalizedDx * enemy.speed * dt;
      enemy.y += normalizedDy * enemy.speed * dt;
    }
  }
}
