
import { EaseEntry, templates } from "dat.gui.ease";
import { Power0, Power1, Power2, Power3, Power4, Expo, Circ } from "gsap";

export default [
    new EaseEntry(Power0.easeNone, templates.Linear).displayAs("Power0"),

    new EaseEntry(Power1.easeIn, templates.SineIn).displayAs("Power1"),
    new EaseEntry(Power1.easeOut, templates.SineOut).displayAs("Power1"),
    new EaseEntry(Power1.easeInOut, templates.SineInOut).displayAs("Power1"),

    new EaseEntry(Power2.easeIn, templates.QuadIn).displayAs("Power2"),
    new EaseEntry(Power2.easeOut, templates.QuadOut).displayAs("Power2"),
    new EaseEntry(Power2.easeInOut, templates.QuadInOut).displayAs("Power2"),

    new EaseEntry(Power3.easeIn, templates.CubicIn).displayAs("Power3"),
    new EaseEntry(Power3.easeOut, templates.CubicOut).displayAs("Power3"),
    new EaseEntry(Power3.easeInOut, templates.CubicInOut).displayAs("Power3"),

    new EaseEntry(Power4.easeIn, templates.QuartIn).displayAs("Power4"),
    new EaseEntry(Power4.easeOut, templates.QuartOut).displayAs("Power4"),
    new EaseEntry(Power4.easeInOut, templates.QuartInOut).displayAs("Power4"),

    new EaseEntry(Expo.easeIn, templates.ExpoIn).displayAs("Expo"),
    new EaseEntry(Expo.easeOut, templates.ExpoOut).displayAs("Expo"),
    new EaseEntry(Expo.easeInOut, templates.ExpoInOut).displayAs("Expo"),

    new EaseEntry(Circ.easeIn, templates.CircIn).displayAs("Circ"),
    new EaseEntry(Circ.easeOut, templates.CircOut).displayAs("Circ"),
    new EaseEntry(Circ.easeInOut, templates.CircInOut).displayAs("Circ")
];