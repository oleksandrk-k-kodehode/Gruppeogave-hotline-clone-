export class SeekBehaviour {
  update(enemy, dt, player) {
    const dx = player.x - enemy.x;
    const dy = player.y - enemy.y;

    const dist = Math.hypot(dx, dy);

    if (dist > 0) {
      enemy.x += (dx / dist) * enemy.speed * dt;
      enemy.y += (dy / dist) * enemy.speed * dt;

      const angle = Math.atan2(dy, dx);
      enemy.entity.style.transform = `rotate(${angle + Math.PI}rad)`;
    }
  }
}
