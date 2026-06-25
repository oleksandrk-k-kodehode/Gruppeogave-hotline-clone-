class Bullet {
    constructor(
        x,
        y,
        img = "./assets/bullet.png",
        identity = "bullet",
        width = 5,
        height = 2,
        angle = 0,
    ) {
        this.x = x;
        this.y = y;
        this.angle = angle;

        this.width = width;
        this.height = height;

        this.img = img;
        this.identity = identity;
    }

    buildBullet(angle = this.angle) {
        const bullet = document.createElement("div");
        bullet.className = "bullet";
        bullet.style.position = "absolute";
        bullet.style.width = `${this.width}px`;
        bullet.style.height = `${this.height}px`;

        const bulletImg = new Image();
        bulletImg.src = this.img;
        bulletImg.style.width = `${this.width}px`;
        bulletImg.style.height = `${this.height}px`;

        bullet.append(bulletImg);
        bullet.style.transform = `rotate(${angle}deg)`;
        return bullet;
    }
}

export { Bullet };
