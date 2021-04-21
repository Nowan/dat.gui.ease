
import { EaseEntry, templates } from "dat.gui.ease";

export default [
    new EaseEntry("none", templates.Linear).displayAs("Power0"),

    new EaseEntry("power1.in", templates.SineIn).displayAs("Power1"),
    new EaseEntry("power1.out", templates.SineOut).displayAs("Power1"),
    new EaseEntry("power1.inOut", templates.SineInOut).displayAs("Power1"),

    new EaseEntry("power2.in", templates.CubicIn).displayAs("Power2"),
    new EaseEntry("power2.out", templates.CubicOut).displayAs("Power2"),
    new EaseEntry("power2.inOut", templates.CubicInOut).displayAs("Power2"),

    new EaseEntry("power3.in", templates.QuartIn).displayAs("Power3"),
    new EaseEntry("power3.out", templates.QuartOut).displayAs("Power3"),
    new EaseEntry("power3.inOut", templates.QuartInOut).displayAs("Power3"),

    new EaseEntry("power4.in", templates.QuintIn).displayAs("Power4"),
    new EaseEntry("power4.out", templates.QuintOut).displayAs("Power4"),
    new EaseEntry("power4.inOut", templates.QuintInOut).displayAs("Power4"),

    new EaseEntry("expo.in", templates.ExpoIn).displayAs("Expo"),
    new EaseEntry("expo.out", templates.ExpoOut).displayAs("Expo"),
    new EaseEntry("expo.inOut", templates.ExpoInOut).displayAs("Expo"),

    new EaseEntry("circ.in", templates.CircIn).displayAs("Circ"),
    new EaseEntry("circ.out", templates.CircOut).displayAs("Circ"),
    new EaseEntry("circ.inOut", templates.CircInOut).displayAs("Circ")
];