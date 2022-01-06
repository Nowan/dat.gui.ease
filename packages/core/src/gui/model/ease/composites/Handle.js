import Point from "./Point";

export default class Handle extends Point {
    toPoint() {
        return Point.of(this.x, this.y);
    }
    
    static of(x, y) {
        return new Handle(x, y);
    }
}