import Handle from "./Handle";
import Point from "./Point";

export default class Anchor extends Point {
    constructor(x, y) {
        super(x, y);
        this.handle = new Handle(x, y);
    }
}