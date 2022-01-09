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
        
        this.preset(Easing.Linear.None, Linear)
            .preset(Easing.Sinusoidal.In, SineIn)
            .preset(Easing.Sinusoidal.Out, SineOut)
            .preset(Easing.Sinusoidal.InOut, SineInOut)
            .preset(Easing.Quadratic.In, QuadIn)
            .preset(Easing.Quadratic.Out, QuadOut)
            .preset(Easing.Quadratic.InOut, QuadInOut)
            .preset(Easing.Cubic.In, CubicIn)
            .preset(Easing.Cubic.Out, CubicOut)
            .preset(Easing.Cubic.InOut, CubicInOut)
            .preset(Easing.Quartic.In, QuartIn)
            .preset(Easing.Quartic.Out, QuartOut)
            .preset(Easing.Quartic.InOut, QuartInOut)
            .preset(Easing.Exponential.In, ExpoIn)
            .preset(Easing.Exponential.Out, ExpoOut)
            .preset(Easing.Exponential.InOut, ExpoInOut)
            .preset(Easing.Circular.In, CircIn)
            .preset(Easing.Circular.Out, CircOut)
            .preset(Easing.Circular.InOut, CircInOut)
            .pick(datObject => CustomEase.checkSignature(datObject)).transform(
                datEase => datEase.ease.clone(),
                middlewareEase => new CustomEase(middlewareEase.svgPath))
    }
}