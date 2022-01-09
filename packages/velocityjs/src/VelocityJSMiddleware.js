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
        
        this.preset("linear", Linear)
            .preset("easeInSine", SineIn)
            .preset("easeOutSine", SineOut)
            .preset("easeInOutSine", SineInOut)
            .preset("easeInQuad", QuadIn)
            .preset("easeOutQuad", QuadOut)
            .preset("easeInOutQuad", QuadInOut)
            .preset("easeInCubic", CubicIn)
            .preset("easeOutCubic", CubicOut)
            .preset("easeInOutCubic", CubicInOut)
            .preset("easeInQuart", QuartIn)
            .preset("easeOutQuart", QuartOut)
            .preset("easeInOutQuart", QuartInOut)
            .preset("easeInExpo", ExpoIn)
            .preset("easeOutExpo", ExpoOut)
            .preset("easeInOutExpo", ExpoInOut)
            .preset("easeInCirc", CircIn)
            .preset("easeOutCirc", CircOut)
            .preset("easeInOutCirc", CircInOut)
    }
}