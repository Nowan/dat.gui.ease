import Ease, { Anchor } from "../ease/Ease";
import Curve from "./enum/Curve";
import Orientation from "./enum/Orientation";

export {
    Curve,
    Orientation
}

export default class EasePreset extends Ease {
    static CURVE = Curve;
    static ORIENTATION = Orientation;

    constructor(curve = EasePreset.CURVE.LINEAR, orientation = EasePreset.ORIENTATION.NONE, points = [0, 0, 1, 1]) {
        super(..._parseAnchors(points));
        this.curve = curve;
        this.orientation = orientation;
        this._alias = null;
    }

    get name() {
        return this._alias || this.curve;
    }

    clone() {
        const clone = new EasePreset(this.curve, this.orientation);
        clone.anchors.length = 0;
        
        this.anchors.forEach(anchor => {
            const anchorClone = new Anchor(anchor.x, anchor.y);
            anchorClone.handle.x = anchor.handle.x;
            anchorClone.handle.y = anchor.handle.y;
            clone.anchors.push(anchorClone);
        });
        
        return clone;
    }

    alias(value) {
        this._alias = value;
        return this;
    }

    toString() {
        return `${this.curve}.${this.orientation}`;
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