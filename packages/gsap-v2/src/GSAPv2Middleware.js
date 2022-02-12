import { Middleware, Ease, presets } from "dat.gui.ease"
import { Power0, Power1, Power2, Power3, Power4, Expo, Circ, Back } from "gsap";
import { BackIn, BackOut, BackInOut } from "./presets/Back";
import {
    Power0 as Power0None,
    Power1In, Power1Out, Power1InOut, 
    Power2In, Power2Out, Power2InOut, 
    Power3In, Power3Out, Power3InOut, 
    Power4In, Power4Out, Power4InOut
} from "./presets/PowerN";

const { CircIn, CircOut, CircInOut, ExpoIn, ExpoOut, ExpoInOut } = presets;

const GsapBackIn = Object.getPrototypeOf(Back.easeIn);
const GsapBackOut = Object.getPrototypeOf(Back.easeOut);
const GsapBackInOut = Object.getPrototypeOf(Back.easeInOut);
const gsapBackEasePredicate = GsapBackEaseClass => datObject => typeof datObject === "object" && Object.getPrototypeOf(datObject) === GsapBackEaseClass;

export default class GSAPv2Middleware extends Middleware {
    constructor(CustomEase) {
        super("GSAPv2");
        
        this.preset(Power0None, Power0.easeNone)
            .preset(Power1In, Power1.easeIn)
            .preset(Power1Out, Power1.easeOut)
            .preset(Power1InOut, Power1.easeInOut)
            .preset(Power2In, Power2.easeIn)
            .preset(Power2Out, Power2.easeOut)
            .preset(Power2InOut, Power2.easeInOut)
            .preset(Power3In, Power3.easeIn)
            .preset(Power3Out, Power3.easeOut)
            .preset(Power3InOut, Power3.easeInOut)
            .preset(Power4In, Power4.easeIn)
            .preset(Power4Out, Power4.easeOut)
            .preset(Power4InOut, Power4.easeInOut)
            .preset(ExpoIn, Expo.easeIn)
            .preset(ExpoOut, Expo.easeOut)
            .preset(ExpoInOut, Expo.easeInOut)
            .preset(CircIn, Circ.easeIn)
            .preset(CircOut, Circ.easeOut)
            .preset(CircInOut, Circ.easeInOut)
            .preset(BackIn, gsapBackEasePredicate(GsapBackIn), 
                gsapBackInEase => BackIn.createEase(gsapBackInEase._p1, gsapBackInEase._p2),
                middlewareEase => Back.easeIn.config(middlewareEase.props.getValue("overshoot"))
            )
            .preset(BackOut, gsapBackEasePredicate(GsapBackOut), 
                gsapBackOutEase => BackOut.createEase(gsapBackOutEase._p1, gsapBackOutEase._p2),
                middlewareEase => Back.easeOut.config(middlewareEase.props.getValue("overshoot"))
            )
            .preset(
                BackInOut, gsapBackEasePredicate(GsapBackInOut), 
                gsapBackInOutEase => BackInOut.createEase(gsapBackInOutEase._p1, gsapBackInOutEase._p2),
                middlewareEase => Back.easeInOut.config(middlewareEase.props.getValue("overshoot"))
            );

        if (typeof CustomEase === "function") {
            this.transform(
                datObject => datObject instanceof CustomEase,
                gsapEase => Ease.ofSVGPath(gsapEase.data),
                middlewareEase => CustomEase.create("custom", middlewareEase.svgPath));
        }
    }
}