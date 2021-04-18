import Ease, { Anchor, Curve, Orientation } from "./Ease";

export default class EaseTemplate extends Ease {
    constructor(curve = Curve.LINEAR, orientation = Orientation.NONE, points = [x1 = 0, y1 = 0, x2 = 0, y2 = 0]) {
        super(curve, ..._parseAnchors(points));
        this.orientation = orientation;
    }
}

function _parseAnchors(points) {
    const startAnchor = new Anchor(0, 0);
    const endAnchor = new Anchor(1, 1);

    startAnchor.handle.x = points[0];
    startAnchor.handle.y = points[1];
    endAnchor.handle.x = points[2];
    endAnchor.handle.y = points[3];

    return [startAnchor, endAnchor];
}

export {
    Curve,
    Orientation
}