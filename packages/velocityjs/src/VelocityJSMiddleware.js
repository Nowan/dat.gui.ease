import { Middleware, presets } from "dat.gui.ease"

const {
    Linear,
    SineIn, SineOut, SineInOut,
    QuadIn, QuadOut, QuadInOut,
    CubicIn, CubicOut, CubicInOut,
    QuartIn, QuartOut, QuartInOut,
    ExpoIn, ExpoOut, ExpoInOut,
    CircIn, CircOut, CircInOut
} = presets;

export default class VelocityJSMiddleware extends Middleware {
    constructor() {
        super("VelocityJS");
        
        this.preset(Linear, "linear")
            .preset(SineIn, "easeInSine")
            .preset(SineOut, "easeOutSine")
            .preset(SineInOut, "easeInOutSine")
            .preset(QuadIn, "easeInQuad")
            .preset(QuadOut, "easeOutQuad")
            .preset(QuadInOut, "easeInOutQuad")
            .preset(CubicIn, "easeInCubic")
            .preset(CubicOut, "easeOutCubic")
            .preset(CubicInOut, "easeInOutCubic")
            .preset(QuartIn, "easeInQuart")
            .preset(QuartOut, "easeOutQuart")
            .preset(QuartInOut, "easeInOutQuart")
            .preset(ExpoIn, "easeInExpo")
            .preset(ExpoOut, "easeOutExpo")
            .preset(ExpoInOut, "easeInOutExpo")
            .preset(CircIn, "easeInCirc")
            .preset(CircOut, "easeOutCirc")
            .preset(CircInOut, "easeInOutCirc")
    }
}