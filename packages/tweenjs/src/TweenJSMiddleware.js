import { Middleware, presets } from "dat.gui.ease"
import CustomEase from "./CustomEase";
import { Easing } from "@tweenjs/tween.js";

const {
    Linear,
    SineIn, SineOut, SineInOut,
    QuadIn, QuadOut, QuadInOut,
    CubicIn, CubicOut, CubicInOut,
    QuartIn, QuartOut, QuartInOut,
    ExpoIn, ExpoOut, ExpoInOut,
    CircIn, CircOut, CircInOut
} = presets;

export default class TweenJSMiddleware extends Middleware {
    constructor() {
        super("TweenJS");
        
        this.preset(Linear, Easing.Linear.None)
            .preset(SineIn, Easing.Sinusoidal.In)
            .preset(SineOut, Easing.Sinusoidal.Out)
            .preset(SineInOut, Easing.Sinusoidal.InOut)
            .preset(QuadIn, Easing.Quadratic.In)
            .preset(QuadOut, Easing.Quadratic.Out)
            .preset(QuadInOut, Easing.Quadratic.InOut)
            .preset(CubicIn, Easing.Cubic.In)
            .preset(CubicOut, Easing.Cubic.Out)
            .preset(CubicInOut, Easing.Cubic.InOut)
            .preset(QuartIn, Easing.Quartic.In)
            .preset(QuartOut, Easing.Quartic.Out)
            .preset(QuartInOut, Easing.Quartic.InOut)
            .preset(ExpoIn, Easing.Exponential.In)
            .preset(ExpoOut, Easing.Exponential.Out)
            .preset(ExpoInOut, Easing.Exponential.InOut)
            .preset(CircIn, Easing.Circular.In)
            .preset(CircOut, Easing.Circular.Out)
            .preset(CircInOut, Easing.Circular.InOut)
            .transform(
                datObject => CustomEase.checkSignature(datObject),
                datEase => datEase.ease.clone(),
                middlewareEase => new CustomEase(middlewareEase.svgPath));
    }
}