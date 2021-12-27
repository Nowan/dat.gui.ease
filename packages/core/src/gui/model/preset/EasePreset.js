import Ease from "../ease/Ease";
import Curve from "./enum/Curve";
import Orientation from "./enum/Orientation";

export {
    Curve,
    Orientation
}

class EasePreset {
    static CURVE = Curve;
    static ORIENTATION = Orientation;

    constructor(easeOrSvgPath, curve = EasePreset.CURVE.UNDEFINED, orientation = EasePreset.ORIENTATION.NONE) {
        this.ease = easeOrSvgPath instanceof Ease ? easeOrSvgPath : Ease.fromSVGPath(easeOrSvgPath);
        this.curve = curve;
        this.orientation = orientation;
    }

    clone() {
        return EasePreset.of(this.ease.toString(), this.curve, this.orientation);
    }

    alias(curve, orientation) {
        this.curve = curve || this.curve;
        this.orientation = orientation || this.orientation;
        return this;
    }

    static of(svgPath, curve = EasePreset.CURVE.UNDEFINED, orientation = EasePreset.ORIENTATION.NONE) {
        return new EasePreset(svgPath, curve, orientation);
    }

    // Static getters for easings commonly used across many animation engines
    // https://easings.net/

    static get Linear() {
        return EasePreset.of("M 0,0 C 0,0 1,1 1,1", Curve.LINEAR, Orientation.NONE);
    }

    static get Custom() {
        return EasePreset.of("M 0,0 C 0,0 1,1 1,1", Curve.CUSTOM, Orientation.NONE);
    }

    static get SineIn() {
        return EasePreset.of("M 0,0 C 0.12,0 0.39,0 1,1", Curve.SINE, Orientation.IN);
    }

    static get SineOut() {
        return EasePreset.of("M 0,0 C 0.61,1 0.88,1 1,1", Curve.SINE, Orientation.OUT);
    }

    static get SineInOut() {
        return EasePreset.of("M 0,0 C 0.37,0 0.63,1 1,1", Curve.SINE, Orientation.IN_OUT);
    }

    static get QuadIn() {
        return EasePreset.of("M 0,0 C 0.11,0 0.5,0 1,1", Curve.QUAD, Orientation.IN);
    }

    static get QuadOut() {
        return EasePreset.of("M 0,0 C 0.5,1 0.89,1 1,1", Curve.QUAD, Orientation.OUT);
    }

    static get QuadInOut() {
        return EasePreset.of("M 0,0 C 0.45,0 0.55,1 1,1", Curve.QUAD, Orientation.IN_OUT);
    }

    static get CubicIn() {
        return EasePreset.of("M 0,0 C 0.32,0 0.67,0 1,1", Curve.CUBIC, Orientation.IN);
    }

    static get CubicOut() {
        return EasePreset.of("M 0,0 C 0.33,1 0.68,1 1,1", Curve.CUBIC, Orientation.OUT);
    }

    static get CubicInOut() {
        return EasePreset.of("M 0,0 C 0.65,0 0.35,1 1,1", Curve.CUBIC, Orientation.IN_OUT);
    }

    static get QuartIn() {
        return EasePreset.of("M 0,0 C 0.5,0 0.75,0 1,1", Curve.QUART, Orientation.IN);
    }

    static get QuartOut() {
        return EasePreset.of("M 0,0 C 0.25,1 0.5,1 1,1", Curve.QUART, Orientation.OUT);
    }

    static get QuartInOut() {
        return EasePreset.of("M 0,0 C 0.76,0 0.24,1 1,1", Curve.QUART, Orientation.IN_OUT);
    }

    static get ExpoIn() {
        return EasePreset.of("M 0,0 C 0.7,0 0.84,0 1,1", Curve.EXPO, Orientation.IN);
    }

    static get ExpoOut() {
        return EasePreset.of("M 0,0 C 0.16,1 0.3,1 1,1", Curve.EXPO, Orientation.OUT);
    }

    static get ExpoInOut() {
        return EasePreset.of("M 0,0 C 0.87,0 0.13,1 1,1", Curve.EXPO, Orientation.IN_OUT);
    }

    static get CircIn() {
        return EasePreset.of("M 0,0 C 0.55,0 1,0.45 1,1", Curve.CIRC, Orientation.IN);
    }

    static get CircOut() {
        return EasePreset.of("M 0,0 C 0,0.55 0.45,1 1,1", Curve.CIRC, Orientation.OUT);
    }

    static get CircInOut() {
        return EasePreset.of("M 0,0 C 0.85,0 0.15,1 1,1", Curve.CIRC, Orientation.IN_OUT);
    }

    static get BackIn() {
        return EasePreset.of("M 0,0 C 0.36,0 0.66,-0.56 1,1", Curve.BACK, Orientation.IN);
    }

    static get BackOut() {
        return EasePreset.of("M 0,0 C 0.34,1.56 0.64,1 1,1", Curve.BACK, Orientation.OUT);
    }

    static get BackInOut() {
        return EasePreset.of("M 0,0 C 0.68,-0.6 0.32,1.6 1,1", Curve.BACK, Orientation.IN_OUT);
    }
}

export default EasePreset;