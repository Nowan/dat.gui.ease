import { Middleware, Ease, EasePreset, presets } from "dat.gui.ease"
import {
    Power0,
    Power1In, Power1Out, Power1InOut, 
    Power2In, Power2Out, Power2InOut, 
    Power3In, Power3Out, Power3InOut, 
    Power4In, Power4Out, Power4InOut
} from "./presets/PowerN";

const { CircIn, CircOut, CircInOut, ExpoIn, ExpoOut, ExpoInOut } = presets;

class GSAPv3Middleware extends Middleware {
    constructor(CustomEase) {
        super("GSAPv3");
        
        this.preset(Power0, "none")
            .preset(Power1In, "power1.in")
            .preset(Power1Out, "power1.out")
            .preset(Power1InOut, "power1.inOut")
            .preset(Power2In, "power2.in")
            .preset(Power2Out, "power2.out")
            .preset(Power2InOut, "power2.inOut")
            .preset(Power3In, "power3.in")
            .preset(Power3Out, "power3.out")
            .preset(Power3InOut, "power3.inOut")
            .preset(Power4In, "power4.in")
            .preset(Power4Out, "power4.out")
            .preset(Power4InOut, "power4.inOut")
            .preset(ExpoIn, "expo.in")
            .preset(ExpoOut, "expo.out")
            .preset(ExpoInOut, "expo.inOut")
            .preset(CircIn, "circ.in")
            .preset(CircOut, "circ.out")
            .preset(CircInOut, "circ.inOut");

        if (typeof CustomEase === "function") {
            this.transform(
                datObject => typeof datObject === "object" && typeof datObject.custom === "object" && datObject.custom instanceof CustomEase,
                gsapEase => Ease.ofSVGPath(gsapEase.custom.data),
                middlewareEase => CustomEase.create("custom", middlewareEase.svgPath));
        }
    }
}

export default GSAPv3Middleware;