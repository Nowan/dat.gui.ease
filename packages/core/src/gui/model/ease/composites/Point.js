export default class Point {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    copy(pointLike) {
        this.x = pointLike.x;
        this.y = pointLike.y;
    }

    static of(x, y) {
        return new Point(x, y);
    }
}