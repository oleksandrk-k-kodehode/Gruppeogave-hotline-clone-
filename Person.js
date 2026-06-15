class Person {
    constructor(x, y, upperbody, direction = "up", speed = 4, role = "player") {
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.speed = speed;
        this.angle = 0;

        this.upperbodyImg = upperbody;

        this.mouseX = x;
        this.mouseY = y;

        this.role = role;
        [this.entity, this.upperBody] = this.build(this.role);
        this.entity.style.top = this.y + "px";
        this.entity.style.left = this.x + "px";
    }

    build(identity) {
        const entity = document.createElement("div");
        entity.id = identity;

        const upperBody = new Image();
        upperBody.src = this.upperbodyImg;

        const legs = document.createElement("div");
        legs.id = "player";

        entity.append(legs, upperBody);

        return [entity, upperBody];
    }

    move() {
        const radians = ((this.angle - 90) * Math.PI) / 180;
        if (this.direction == "backwards") {
            this.x = this.x - Math.cos(radians) * 3;
            this.y = this.y - Math.sin(radians) * 3;
        } else {
            this.x = this.x + Math.cos(radians) * 3;
            this.y = this.y + Math.sin(radians) * 3;
        }

        this.entity.style.top = this.y + "px";
        this.entity.style.left = this.x + "px";
    }

    rotate(element, direction) {
        if (direction === "left") {
            this.angle -= 3;
        } else if (direction === "right") {
            this.angle += 3;
        }

        element.style.transform = `rotate(${this.angle}deg)`;
    }

    #bulletBuild() {
        const bullet = document.createElement("div");
        bullet.id = "bullet";
        const bulletImg = new Image();
        bulletImg.src = "./assets/";
        bullet.append(bulletImg);
        return bullet;
    }

    #trackMouse() {
        document.addEventListener("mouseover", (e) => {
            ((this.mouseX = e.screenX), (this.mouseY = e.screenY));
        });
    }

    #calcDistance(y2, y1, x2, x1) {
        let deltaX = x2 - x1;
        let deltaY = y2 - y1;
        return Math.hypot(deltaX, deltaY);
    }

    #calcAngle() {}

    aim() {
        this.#trackMouse();
    }

    shoot() {}
}

export { Person };
