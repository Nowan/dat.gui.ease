export default class Point {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    copy(pointLike) {
        this.x = pointLike.x;
        this.y = pointLike.y;
    }

    set(xOrPointLike, y) {
        if (typeof xOrPointLike === "object") {
            this.x = xOrPointLike.x;
            this.y = xOrPointLike.y;
        }
        else {
            this.x = xOrPointLike;
            this.y = y;
        }
    }

    static of(x, y) {
        return new Point(x, y);
    }
}