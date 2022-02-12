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
        
        this.preset("none", Power0)
            .preset("power1.in", Power1In)
            .preset("power1.out", Power1Out)
            .preset("power1.inOut", Power1InOut)
            .preset("power2.in", Power2In)
            .preset("power2.out", Power2Out)
            .preset("power2.inOut", Power2InOut)
            .preset("power3.in", Power3In)
            .preset("power3.out", Power3Out)
            .preset("power3.inOut", Power3InOut)
            .preset("power4.in", Power4In)
            .preset("power4.out", Power4Out)
            .preset("power4.inOut", Power4InOut)
            .preset("expo.in", ExpoIn)
            .preset("expo.out", ExpoOut)
            .preset("expo.inOut", ExpoInOut)
            .preset("circ.in", CircIn)
            .preset("circ.out", CircOut)
            .preset("circ.inOut", CircInOut);

        if (typeof CustomEase === "function") {
            this.pick(datObject => typeof datObject.custom === "object" && datObject.custom instanceof CustomEase).transform(
                gsapEase => Ease.ofSVGPath(gsapEase.custom.data),
                middlewareEase => CustomEase.create("custom", middlewareEase.svgPath)
            );
        }
    }
}

export default GSAPv3Middleware;