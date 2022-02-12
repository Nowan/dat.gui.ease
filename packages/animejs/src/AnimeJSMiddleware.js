import { Middleware, presets } from "dat.gui.ease"
import CustomEase from "./CustomEase";

const {
    Linear,
    SineIn, SineOut, SineInOut,
    QuadIn, QuadOut, QuadInOut,
    CubicIn, CubicOut, CubicInOut,
    QuartIn, QuartOut, QuartInOut,
    ExpoIn, ExpoOut, ExpoInOut,
    CircIn, CircOut, CircInOut,
    BackIn, BackOut, BackInOut
} = presets;

export default class AnimeJSMiddleware extends Middleware {
    constructor() {
        super("AnimeJS");
        
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
            .preset(BackIn, "easeInBack")
            .preset(BackOut, "easeOutBack")
            .preset(BackInOut, "easeInOutBack")
            .transform(
                datObject => CustomEase.checkSignature(datObject),
                datEase => datEase.ease.clone(),
                middlewareEase => new CustomEase(middlewareEase.svgPath));
    }
}