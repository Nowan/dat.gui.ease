import Anchor from "./composites/Anchor";
import Handle from "./composites/Handle";
import Point from "./composites/Point";
import InvalidSVGPathException from "./exceptions/InvalidSVGPathException";

export default class Ease {
    constructor(...anchors) {
        this._anchors = Array.from(anchors);
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

    get svgPath() {
        return Ease.toSVGPath(this);
    }

    get points() {
        const points = [];

        for (let i = 0; i < this.anchors.length; i += 2) {
            const startAnchor = this.anchors[i];
            const endAnchor = this.anchors[i + 1];
            
            points.push(startAnchor.toPoint(), startAnchor.handle.toPoint(), endAnchor.handle.toPoint(), endAnchor.toPoint());
        }

        return points;
    }

    equals(ease) {
        return this.svgPath === ease.svgPath;
    }
    
    addAnchor(x, y) {
        const anchor = new Anchor(x, y);
        this.anchors.push(anchor);
        return anchor;
    }

    toString() {
        return this.svgPath;
    }

    static of(...anchors) {
        return new Ease(...anchors);
    }

    static ofSVGPath(svgPath) {
        try {
            const trimmedPath = svgPath.trim();
            const [startX, startY] = trimmedPath.match(/^M *(?<x>[\d\.]+),(?<y>[\d\.]+)/).splice(-2).map(safeParseCoordinate);
            const cCoords = trimmedPath.replace(/^M.*C */, "").replace(/ *$/, "").split(/[ ,]/).map(safeParseCoordinate);

            if (cCoords.length % 6 !== 0) {
                throw new Error("Irregular number of coordinates provided.")
            }
            else {
                const anchors = [];

                anchors[0] = Anchor.ofOriginAndHandle(
                    Point.of(startX, startY),
                    Point.of(cCoords[0], cCoords[1])
                );
        
                for (let i = 2; i < cCoords.length - 4; i += 6) {
                    const a = (i - 2) / 3 + 1;
                    
                    anchors[a] = Anchor.ofOriginAndHandle(
                        Point.of(cCoords[i + 2], cCoords[i + 3]),
                        Point.of(cCoords[i],  cCoords[i + 1])
                    );
    
                    anchors[a + 1] = Anchor.ofOriginAndHandle(
                        Point.of(cCoords[i + 2], cCoords[i + 3]),
                        Point.of(cCoords[i + 4], cCoords[i + 5])
                    );
                }
    
                const lastAnchor = Anchor.ofOriginAndHandle(
                    Point.of(...cCoords.slice(-2)),
                    Point.of(cCoords[cCoords.length - 4], cCoords[cCoords.length - 3])
                );
    
                anchors.push(lastAnchor);
                
                return Ease.of(...anchors);
            }
        }
        catch (e) {
            throw new InvalidSVGPathException(e);
        }
    }

    static toSVGPath(ease) {
        let path = `M ${ease.firstAnchor.x},${ease.firstAnchor.y} C`;

        for (let i = 0; i < ease.anchors.length; i += 2) {
            const startAnchor = ease.anchors[i];
            const endAnchor = ease.anchors[i + 1];
            
            path += ` ${startAnchor.handle.x},${startAnchor.handle.y} ${endAnchor.handle.x},${endAnchor.handle.y} ${endAnchor.x},${endAnchor.y}`;
        }

        const points = ease.points;
        const originPoint = points.shift();
        let path2 = `M ${originPoint.x},${originPoint.y} C`;

        for (let point of points) {
            path2 += ` ${point.x},${point.y}`;
        }

        return path;
    }
}

function safeParseCoordinate(rawCoordinate) {
    const coordinate = Number.parseFloat(rawCoordinate);
    if (coordinate === NaN) throw new Error(`Error parsing coordinate "${rawCoordinate}"`);
    return coordinate;
}

export {
    Anchor,
    Handle,
    Point,
    InvalidSVGPathException
}