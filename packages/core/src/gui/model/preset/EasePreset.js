import Ease from "../ease/Ease";
import Curve from "./enum/Curve";
import Orientation from "./enum/Orientation";

class EasePreset {
    static CURVE = Curve;
    static ORIENTATION = Orientation;

    constructor(easeOrSvgPath, curve = EasePreset.CURVE.UNDEFINED, orientation = EasePreset.ORIENTATION.NONE) {
        this.ease = easeOrSvgPath instanceof Ease ? easeOrSvgPath : Ease.ofSVGPath(easeOrSvgPath);
        this.curve = curve;
        this.orientation = orientation;
    }

    clone() {
        return EasePreset.of(this.ease.toString(), this.curve, this.orientation);
    }

    toString() {
        return `[${this.ease.toString()}][${this.curve}.${this.orientation}]`;
    }

    equals(preset) {
        return this.toString() === preset.toString();
    }

    static of(svgPath, curve = EasePreset.CURVE.UNDEFINED, orientation = EasePreset.ORIENTATION.NONE) {
        return new EasePreset(svgPath, curve, orientation);
    }
}

export {
    Curve,
    Orientation
}

export default EasePreset;