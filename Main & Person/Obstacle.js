class Obstacle {
    constructor(x, y, image, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.imageElement = this.#build(image);
    }

    distance(x, y) {
        return Math.hypot(x - this.x, y - this.y);
    }

    #build(image, role = "obstacle") {
        const imageElement = document.createElement("img");
        imageElement.src = image;
        upperBody.style.height = `${this.width}px`;
        upperBody.style.width = `${this.width}px`;
        imageElement.id = role;

        return imageElement;
    }

    checkCollision(xeno) {
        let centerXX = xeno.currentX;
        let centerXY = xeno.currentY;
        if (centerXX > this.x && centerXX < this.x + this.width) {
            if (centerXY > this.y && centerXY < this.y + this.width) {
                return true;
            }
        }
        return false;
    }
}

export { Obstacle };
