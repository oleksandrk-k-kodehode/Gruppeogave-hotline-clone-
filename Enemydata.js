export const enemyData = {
  Mob: {
    width: 48,
    height: 48,
    speed: 16,
    health: 10,
    damage: 20,
    behaviourType: `seek`,
    image: mobImg,
  },
  Boss: {
    width: 48,
    height: 48,
    speed: 16,
    health: 10,
    damage: 20,

    behaviourType: `seek`,
    image: bossImg,
  },
};

const mobImg = new Image();
mobImg.src = "assets/enemy/enemy-normal.png";

const BossImg = new Image();
bossImg.src = "assets/enemy/enemy-boss.png";
