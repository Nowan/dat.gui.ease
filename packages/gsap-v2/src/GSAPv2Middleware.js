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

export default class GSAPv2Middleware extends Middleware {
    constructor(CustomEase) {
        super("GSAPv2");
        
        this.preset(Power0.easeNone, Power0None)
            .preset(Power1.easeIn, Power1In)
            .preset(Power1.easeOut, Power1Out)
            .preset(Power1.easeInOut, Power1InOut)
            .preset(Power2.easeIn, Power2In)
            .preset(Power2.easeOut, Power2Out)
            .preset(Power2.easeInOut, Power2InOut)
            .preset(Power3.easeIn, Power3In)
            .preset(Power3.easeOut, Power3Out)
            .preset(Power3.easeInOut, Power3InOut)
            .preset(Power4.easeIn, Power4In)
            .preset(Power4.easeOut, Power4Out)
            .preset(Power4.easeInOut, Power4InOut)
            .preset(Expo.easeIn, ExpoIn)
            .preset(Expo.easeOut, ExpoOut)
            .preset(Expo.easeInOut, ExpoInOut)
            .preset(Circ.easeIn, CircIn)
            .preset(Circ.easeOut, CircOut)
            .preset(Circ.easeInOut, CircInOut)
            .preset(
                datObject => typeof datObject === "object" && Object.getPrototypeOf(datObject) === GsapBackIn, 
                gsapBackInEase => BackIn.createEase(gsapBackInEase._p1, gsapBackInEase._p2),
                middlewareEase => Back.easeIn.config(middlewareEase.props.getValue("overshoot")),
                BackIn
            )
            .preset(
                datObject => typeof datObject === "object" && Object.getPrototypeOf(datObject) === GsapBackOut, 
                gsapBackOutEase => BackOut.createEase(gsapBackOutEase._p1, gsapBackOutEase._p2),
                middlewareEase => Back.easeOut.config(middlewareEase.props.getValue("overshoot")),
                BackOut
            )
            .preset(
                datObject => typeof datObject === "object" && Object.getPrototypeOf(datObject) === GsapBackInOut, 
                gsapBackInOutEase => BackInOut.createEase(gsapBackInOutEase._p1, gsapBackInOutEase._p2),
                middlewareEase => Back.easeInOut.config(middlewareEase.props.getValue("overshoot")),
                BackInOut
            );

        if (typeof CustomEase === "function") {
            this.transform(
                datObject => datObject instanceof CustomEase,
                gsapEase => Ease.ofSVGPath(gsapEase.data),
                middlewareEase => CustomEase.create("custom", middlewareEase.svgPath));
        }
    }
}