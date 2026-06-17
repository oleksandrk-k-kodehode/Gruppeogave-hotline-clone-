class Person {
    constructor(
        x,
        y,
        upperbody,
        direction = "forward",
        speed = 3,
        role = "player",
    ) {
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.speed = speed;
        this.angle = 0;

        this.upperbodyImg = upperbody;
        this.width = 30;

        this.mouseX = x;
        this.mouseY = y;

        this.role = role;
        [this.entity, this.upperBody] = this.build(this.role);
        this.entity.style.top = this.y + "px";
        this.entity.style.left = this.x + "px";
        this.centerX = this.#calCenter(this.x, this.width);
        this.centerY = this.#calCenter(this.y, this.width);
    }

    build(identity) {
        const entity = document.createElement("div");
        entity.id = identity;

        const upperBody = new Image();
        upperBody.src = this.upperbodyImg;
        upperBody.style.height = `${this.width}px`;
        upperBody.style.width = `${this.width}px`;
        upperBody.id = "upperBody";

        entity.append(upperBody);
        entity.style.height = `${this.width}px`;
        entity.style.width = `${this.width}px`;

        return [entity, upperBody];
    }

    move() {
        if (this.direction === "backwards") {
            this.y += this.speed;
        } else if (this.direction === "forwards") {
            this.y -= this.speed;
        } else if (this.direction === "left") {
            this.x -= this.speed;
        } else if (this.direction === "right") {
            this.x += this.speed;
        }
        this.entity.style.top = this.y + "px";
        this.entity.style.left = this.x + "px";
    }

    #calCenter(height, width) {
        return height + width / 2;
    }

    #bulletBuild(
        x,
        y,
        img = "./assets/bullet.png",
        speed = 300,
        damage = "yes",
        width = 5,
        height = 2.5,
    ) {
        const bulletImg = new Image();
        bulletImg.className = "bullet";
        bulletImg.style.position = "absolute";
        bulletImg.src = img;
        bulletImg.style.width = `${width}px`;
        bulletImg.style.height = `${height}px`;

        this.entity.append(bulletImg);
        return bulletImg;
    }

    #calcDistance(y2, y1, x2, x1) {
        let deltaX = x2 - x1;
        let deltaY = y2 - y1;
        return Math.hypot(deltaX, deltaY);
    }

    #calcAngle(x1, x2, y1, y2) {
        return (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;
    }

    aim() {
        this.centerX = this.#calCenter(this.x, this.width);
        this.centerY = this.#calCenter(this.y, this.width);
        let rotation = this.#calcAngle(
            this.centerX,
            this.mouseX,
            this.centerY,
            this.mouseY,
        );
        this.upperBody.style.transform = `rotate(${rotation}deg)`;
    }

    #bulletFlight() {
        const bullet = document.querySelector(".bullet");
        bullet.classList.remove("animation");
        void bullet.offsetWidth; // force reflow
        bullet.classList.add("animation");
    }

    shoot() {
        console.log("pew pew");

        this.aim();
        document.documentElement.style.setProperty(
            "--fromX",
            this.centerX + "px",
        );
        document.documentElement.style.setProperty(
            "--fromY",
            this.centerY + "px",
        );
        document.documentElement.style.setProperty("--toX", this.mouseX + "px");
        document.documentElement.style.setProperty("--toY", this.mouseY + "px");
        this.#bulletBuild();

        this.#bulletFlight();
    }
}

export { Person };
