import Anchor from "./composites/Anchor";
import Handle from "./composites/Handle";
import Point from "./composites/Point";
import Curve from "./enum/Curve";
import Orientation from "./enum/Orientation";

export default class Ease {
    constructor(curve = Curve.CUSTOM, ...anchors) {
        this.curve = curve;
        this._anchors = anchors;
    }

    static fromSVGPath(svgPath) {
        const ease = new Ease();
        const { x: startX, y: startY } = svgPath.match(/M ?(?<x>\d+),(?<y>\d+)/).groups;
        const cCoords = svgPath.replace(/^M.*C ?/, "").replace(/ ?$/, "").split(" ").reduce((coords, pointString) => [...coords, ...pointString.split(",").map(Number.parseFloat)], []);
        
        ease.anchors[0] = new Anchor(startX, startY);
        ease.anchors[0].handle.x = cCoords[0];
        ease.anchors[0].handle.y = cCoords[1];

        for (let i = 2; i < cCoords.length - 4; i += 6) {
            const a = (i - 2) / 6 + 1;

            ease.anchors[a] = new Anchor(cCoords[i + 2], cCoords[i + 3]);
            ease.anchors[a].handle.x = cCoords[i];
            ease.anchors[a].handle.y = cCoords[i + 1];
            
            ease.anchors[a + 1] = new Anchor(cCoords[i + 2], cCoords[i + 3]);
            ease.anchors[a + 1].handle.x = cCoords[i + 4];
            ease.anchors[a + 1].handle.y = cCoords[i + 5];
        }

        const lastAnchor = new Anchor(...cCoords.slice(-2));
        lastAnchor.handle.x = cCoords[cCoords.length - 4];
        lastAnchor.handle.y = cCoords[cCoords.length - 3];
        ease.anchors.push(lastAnchor);

        return ease;
    }

    get anchors() {
        return this._anchors;
    }

    get firstAnchor() {
        return this._anchors[0];
    }

    get lastAnchor() {
        return this._anchors[this._anchors.length - 1];
    }
    
    addAnchor(x, y) {
        const anchor = new Anchor(x, y);
        this.anchors.push(anchor);
        return anchor;
    }

    toString() {
        let path = `M ${this.firstAnchor.x},${this.firstAnchor.y} C`;

        for (let i = 0; i < this.anchors.length; i += 2) {
            const startAnchor = this.anchors[i];
            const endAnchor = this.anchors[i + 1];
            
            path += ` ${startAnchor.handle.x},${startAnchor.handle.y} ${endAnchor.handle.x},${endAnchor.handle.y} ${endAnchor.x},${endAnchor.y}`;
        }

        return path;
    }
}

export {
    Anchor,
    Handle,
    Point,
    Curve,
    Orientation
}