import Handle from "./Handle";
import Point from "./Point";

export default class Anchor extends Point {
    constructor(x, y) {
        super(x, y);
        this.handle = new Handle(x, y);
    }

    toPoint() {
        return Point.of(this.x, this.y);
    }

    static ofOriginAndHandle(originPointLike, handlePointLike) {
        const anchor = Anchor.ofOrigin(originPointLike);
        anchor.handle.copy(handlePointLike);
        return anchor;
    }

    static ofOrigin(pointLike) {
        return Anchor.of(pointLike.x, pointLike.y)
    }

    static of(x, y) {
        return new Anchor(x, y);
    }
}