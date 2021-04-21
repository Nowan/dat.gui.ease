import Ease, { Anchor, Curve, Orientation } from "./Ease";

export default class EaseTemplate extends Ease {
    constructor(curve = Curve.LINEAR, orientation = Orientation.NONE, points = [0, 0, 1, 1]) {
        super(curve, ..._parseAnchors(points));
        this.orientation = orientation;
        this.displayName = curve;
    }

    clone() {
        const clone = new EaseTemplate(this.curve, this.orientation);
        clone.anchors.length = 0;
        
        this.anchors.forEach(anchor => {
            const anchorClone = new Anchor(anchor.x, anchor.y);
            anchorClone.handle.x = anchor.handle.x;
            anchorClone.handle.y = anchor.handle.y;
            clone.anchors.push(anchorClone);
        });
        
        return clone;
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