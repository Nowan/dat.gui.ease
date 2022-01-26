import Ease from "../ease/Ease";
import EasePresetProps from "./EasePresetProps";
import Curve from "./enum/Curve";
import Orientation from "./enum/Orientation";

class EasePreset {
    static CURVE = Curve;
    static ORIENTATION = Orientation;

    constructor(easeOrSvgPath, curve = EasePreset.CURVE.UNDEFINED, orientation = EasePreset.ORIENTATION.NONE) {
        this.ease = easeOrSvgPath instanceof Ease ? easeOrSvgPath : Ease.ofSVGPath(easeOrSvgPath);
        this.curve = curve;
        this.orientation = orientation;
        this.props = new EasePresetProps(this);
    }

    clone() {
        const clone = EasePreset.of(this.ease.toString(), this.curve, this.orientation);
        for (let [propertyName, propertyValue] of this.props.entries()) {
            clone.props.add(propertyName, propertyValue);
        }
        return clone;
    }

    toString() {
        return `[${this.ease.toString()}][${this.curve}.${this.orientation}]`;
    }

    equals(preset) {
        return this.toString() === preset.toString();
    }

    property(propertyName, defaultValue, watcherFn) {
        this.props.add(propertyName, defaultValue, watcherFn);
        return this;
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