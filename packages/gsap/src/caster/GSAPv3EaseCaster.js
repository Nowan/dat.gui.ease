import GSAPEaseCaster from "./GSAPEaseCaster";
import { templates } from "dat.gui.ease";

export default class GSAPv3EaseCaster extends GSAPEaseCaster {
    _createCastMap() {
        return new Map([
            ["none", templates.Linear],
        
            ["power1.in", templates.SineIn],
            ["power1.out", templates.SineOut],
            ["power1.inOut", templates.SineInOut],
        
            ["power2.in", templates.CubicIn],
            ["power2.out", templates.CubicOut],
            ["power2.inOut", templates.CubicInOut],

            ["power3.in", templates.QuartIn],
            ["power3.out", templates.QuartOut],
            ["power3.inOut", templates.QuartInOut],

            ["power4.in", templates.QuintIn],
            ["power4.out", templates.QuintOut],
            ["power4.inOut", templates.QuintInOut],

            ["expo.in", templates.ExpoIn],
            ["expo.out", templates.ExpoOut],
            ["expo.inOut", templates.ExpoInOut],

            ["circ.in", templates.CircIn],
            ["circ.out", templates.CircOut],
            ["circ.inOut", templates.CircInOut]
        ]);
    }
}
