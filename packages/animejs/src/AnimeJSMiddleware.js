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
            .preset("easeInBack", BackIn)
            .preset("easeOutBack", BackOut)
            .preset("easeInOutBack", BackInOut)
            .pick(datObject => CustomEase.checkSignature(datObject)).transform(
                datEase => datEase.ease.clone(),
                middlewareEase => new CustomEase(middlewareEase.svgPath)
            )
    }
}