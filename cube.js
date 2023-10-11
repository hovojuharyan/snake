import props from "./properties.js";

// class Cube represents a body part of the snake
export default class Cube {
    constructor(r, c, directionY, directionX, next) {
        this.r = r;
        this.c = c;
        this.directionX = directionX;
        this.directionY = directionY;
        this.next = next;
    }

    changeDirectionX(newDirectionX) {
        this.directionX = newDirectionX;
        this.directionY = 0;
    }

    changeDirectionY(newDirectionY) {
        this.directionY = newDirectionY;
        this.directionX = 0;
    }

    nextR() {
        let newR = this.r - this.directionY;
        return Cube.normalizePosition(newR, props.stats.rowCount);
    }

    nextC() {
        let newC = this.c + this.directionX;
        return Cube.normalizePosition(newC, props.stats.colCount);
    }

    move() {
        if (this.directionX != 0) {
            this.c = this.nextC();
        }
        if (this.directionY != 0) {
            this.r = this.nextR();
        }
    }

    static normalizePosition(newPos, treshold) {
        if (newPos > treshold) {
            return 1;
        }
        if (newPos < 1) {
            return treshold;;
        }
        return newPos;
    }
}
