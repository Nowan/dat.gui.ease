import { Middleware, Ease, EasePreset, presets } from "dat.gui.ease"
import { Power0, Power1, Power2, Power3, Power4, Expo, Circ, Back } from "gsap";
import cubicEquationRoots from "./cubicEquationRoots";

const { Linear, CircIn, CircOut, CircInOut, ExpoIn, ExpoOut, ExpoInOut, BackIn, BackOut, BackInOut } = presets;

const GsapBackIn = Object.getPrototypeOf(Back.easeIn);
const GsapBackOut = Object.getPrototypeOf(Back.easeOut);
const GsapBackInOut = Object.getPrototypeOf(Back.easeInOut);

var createEaseBackIn = function(c1, c3) {
    const ease = Ease.ofSVGPath(`M 0,0 C 0.36,0 0.66,-0.56 1,1`);
    ease.props.add("overshoot", c1, mutateEaseBackIn, { min: 0.5, max: 5, step: 0.1 });

    return mutateEaseBackIn(ease, c1, c3);
}

var createEaseBackOut = function(c1, c3) {
    const ease = Ease.ofSVGPath(`M 0,0 C 0.34,1.56 0.64,1 1,1`);
    ease.props.add("overshoot", c1, mutateEaseBackOut, { min: 0.5, max: 5, step: 0.1 });

    return mutateEaseBackOut(ease, c1, c3);
}

var createEaseBackInOut = function(c1, c3) {
    const ease = Ease.ofSVGPath(`M 0,0 C 0.68,-0.6 0.32,1.6 1,1`);
    ease.props.add("overshoot", c1, mutateEaseBackInOut, { min: 0.5, max: 5, step: 0.1 });
    
    return mutateEaseBackInOut(ease, c1, c3);
}

var mutateEaseBackIn = function(ease, c1, c3 = c1 + 1) {
    const roots = cubicEquationRoots(c3, c1, 0, 1);

    ease.lastAnchor.handle.y = Number(1 - c3 * roots[1].i).toFixed(3);

    return ease;
}

var mutateEaseBackOut = function(ease, c1, c3 = c1 + 1) {
    const roots = cubicEquationRoots(c3, c1, 0, 1);

    ease.firstAnchor.handle.y = Number((c3 * roots[1].i).toFixed(3));

    return ease;
}

var mutateEaseBackInOut = function(ease, c1, c3 = c1 + 1) {
    const roots = cubicEquationRoots(c3, c1, 0, 1);
    const handleY = c3 * roots[1].i;

    ease.firstAnchor.handle.y = Number((1 - handleY).toFixed(3));
    ease.lastAnchor.handle.y = Number(handleY.toFixed(3));

    return ease;
}

export default class GSAPv2Middleware extends Middleware {
    constructor(CustomEase) {
        super("GSAPv2");
        
        this.preset(Power0.easeNone, Linear.withAlias("Power0"))
            .preset(Power1.easeIn, EasePreset.of("M0,0 C0,0 0.086,0.005 0.135,0.018 0.181,0.029 0.211,0.043 0.255,0.065 0.302,0.089 0.331,0.108 0.375,0.14 0.423,0.176 0.451,0.201 0.495,0.245 0.543,0.293 0.571,0.324 0.615,0.378 0.67,0.447 0.7,0.488 0.75,0.562 0.799,0.636 0.825,0.679 0.87,0.756 0.923,0.85 1,1 1,1", "Power1", EasePreset.ORIENTATION.IN))
            .preset(Power1.easeOut, EasePreset.of("M0,0 C0,0 0.07,0.138 0.12,0.225 0.164,0.304 0.19,0.347 0.24,0.422 0.284,0.489 0.31,0.527 0.36,0.59 0.409,0.652 0.439,0.689 0.495,0.744 0.543,0.793 0.575,0.822 0.63,0.863 0.672,0.895 0.702,0.913 0.75,0.937 0.793,0.959 0.823,0.971 0.87,0.983 0.917,0.994 1,1 1,1", "Power1", EasePreset.ORIENTATION.OUT))
            .preset(Power1.easeInOut, EasePreset.of("M0,0 C0,0 0.044,0.003 0.07,0.009 0.093,0.015 0.11,0.021 0.13,0.033 0.176,0.063 0.208,0.087 0.25,0.125 0.279,0.151 0.294,0.172 0.32,0.204 0.348,0.241 0.366,0.263 0.39,0.304 0.468,0.438 0.504,0.522 0.585,0.655 0.626,0.724 0.656,0.763 0.705,0.825 0.73,0.858 0.749,0.876 0.78,0.903 0.806,0.926 0.825,0.94 0.855,0.957 0.879,0.972 0.898,0.98 0.925,0.988 0.951,0.996 1,1 1,1", "Power1", EasePreset.ORIENTATION.IN_OUT))
            .preset(Power2.easeIn, EasePreset.of("M0,0 C0,0 0.115,-0.001 0.185,0.006 0.24,0.012 0.277,0.018 0.33,0.035 0.378,0.051 0.411,0.067 0.455,0.094 0.503,0.124 0.534,0.149 0.575,0.19 0.62,0.235 0.647,0.268 0.685,0.321 0.731,0.387 0.756,0.43 0.795,0.502 0.839,0.587 0.862,0.639 0.9,0.729 0.942,0.833 1,1 1,1", "Power2", EasePreset.ORIENTATION.IN))
            .preset(Power2.easeOut, EasePreset.of("M0,0 C0,0 0.057,0.166 0.1,0.271 0.135,0.357 0.157,0.406 0.2,0.488 0.238,0.561 0.263,0.604 0.31,0.671 0.347,0.725 0.374,0.758 0.42,0.804 0.46,0.846 0.491,0.871 0.54,0.902 0.584,0.931 0.619,0.947 0.67,0.964 0.721,0.981 0.759,0.987 0.815,0.993 0.884,1.001 1,1 1,1", "Power2", EasePreset.ORIENTATION.OUT))
            .preset(Power2.easeInOut, EasePreset.of("M0,0 C0,0 0.066,0 0.105,0.004 0.135,0.008 0.157,0.013 0.185,0.025 0.214,0.037 0.234,0.05 0.26,0.07 0.286,0.091 0.302,0.109 0.325,0.137 0.348,0.166 0.36,0.186 0.38,0.219 0.401,0.256 0.413,0.278 0.43,0.318 0.497,0.478 0.527,0.577 0.595,0.734 0.611,0.772 0.626,0.794 0.65,0.828 0.67,0.858 0.685,0.877 0.71,0.902 0.731,0.923 0.747,0.936 0.772,0.952 0.793,0.966 0.81,0.974 0.835,0.982 0.861,0.99 0.881,0.993 0.91,0.997 0.943,1 1,1 1,1", "Power2", EasePreset.ORIENTATION.IN_OUT))
            .preset(Power3.easeIn, EasePreset.of("M0,0 C0,0 0.144,-0.002 0.235,0.003 0.296,0.006 0.336,0.01 0.395,0.024 0.441,0.035 0.474,0.047 0.515,0.07 0.558,0.094 0.589,0.117 0.625,0.152 0.668,0.196 0.695,0.23 0.73,0.283 0.771,0.348 0.793,0.392 0.825,0.463 0.864,0.552 0.884,0.606 0.915,0.7 0.952,0.815 1,1 1,1", "Power3", EasePreset.ORIENTATION.IN))
            .preset(Power3.easeOut, EasePreset.of("M0,0 C0,0 0.047,0.184 0.085,0.299 0.115,0.393 0.135,0.447 0.175,0.536 0.206,0.607 0.228,0.651 0.27,0.716 0.304,0.769 0.331,0.803 0.375,0.847 0.41,0.883 0.441,0.905 0.485,0.929 0.525,0.952 0.558,0.964 0.605,0.975 0.663,0.989 0.703,0.993 0.765,0.996 0.855,1.002 1,1 1,1", "Power3", EasePreset.ORIENTATION.OUT))
            .preset(Power3.easeInOut, EasePreset.of("M0,0 C0,0 0.083,-0.001 0.135,0.002 0.165,0.005 0.187,0.007 0.215,0.017 0.242,0.026 0.264,0.037 0.287,0.054 0.312,0.073 0.328,0.091 0.347,0.116 0.369,0.145 0.38,0.166 0.397,0.199 0.416,0.236 0.426,0.259 0.44,0.299 0.497,0.473 0.521,0.581 0.58,0.751 0.593,0.79 0.608,0.814 0.63,0.85 0.647,0.878 0.662,0.897 0.685,0.921 0.702,0.939 0.718,0.95 0.74,0.963 0.76,0.975 0.776,0.981 0.8,0.987 0.825,0.993 0.842,0.995 0.87,0.997 0.919,1 1,1 1,1", "Power3", EasePreset.ORIENTATION.IN_OUT))
            .preset(Power4.easeIn, EasePreset.of("M0,0 C0,0 0.193,-0.002 0.315,0.003 0.369,0.005 0.403,0.008 0.455,0.019 0.499,0.029 0.531,0.039 0.57,0.06 0.609,0.081 0.638,0.102 0.67,0.135 0.71,0.176 0.735,0.21 0.765,0.262 0.802,0.326 0.822,0.371 0.85,0.443 0.886,0.538 0.903,0.596 0.93,0.695 0.961,0.813 1,1 1,1", "Power4", EasePreset.ORIENTATION.IN))
            .preset(Power4.easeOut, EasePreset.of("M0,0 C0,0 0.038,0.186 0.07,0.304 0.096,0.403 0.113,0.461 0.15,0.556 0.177,0.628 0.197,0.673 0.235,0.738 0.264,0.789 0.289,0.823 0.33,0.864 0.361,0.897 0.39,0.918 0.43,0.939 0.468,0.96 0.5,0.97 0.545,0.98 0.599,0.992 0.636,0.994 0.695,0.997 0.812,1.002 1,1 1,1", "Power4", EasePreset.ORIENTATION.OUT))
            .preset(Power4.easeInOut, EasePreset.of("M0,0 C0,0 0.143,0 0.225,0.009 0.246,0.011 0.263,0.018 0.282,0.028 0.303,0.039 0.318,0.05 0.335,0.067 0.356,0.089 0.369,0.107 0.385,0.135 0.405,0.17 0.415,0.195 0.43,0.235 0.448,0.284 0.456,0.314 0.47,0.366 0.503,0.498 0.515,0.575 0.55,0.704 0.561,0.748 0.571,0.773 0.59,0.814 0.604,0.847 0.615,0.868 0.635,0.896 0.652,0.92 0.667,0.937 0.69,0.954 0.71,0.969 0.729,0.978 0.755,0.985 0.781,0.993 0.801,0.996 0.83,0.997 0.894,1.001 1,1 1,1", "Power4", EasePreset.ORIENTATION.IN_OUT))
            .preset(Expo.easeIn, ExpoIn)
            .preset(Expo.easeOut, ExpoOut)
            .preset(Expo.easeInOut, ExpoInOut)
            .preset(Circ.easeIn, CircIn)
            .preset(Circ.easeOut, CircOut)
            .preset(Circ.easeInOut, CircInOut)
            .preset(
                datObject => typeof datObject === "object" && Object.getPrototypeOf(datObject) === GsapBackIn, 
                gsapBackInEase => createEaseBackIn(gsapBackInEase._p1, gsapBackInEase._p2),
                middlewareEase => Back.easeIn.config(middlewareEase.props.getValue("overshoot")),
                BackIn.property("overshoot", 1.7, mutateEaseBackIn, { min: 0.5, max: 5, step: 0.1 })
            )
            .preset(
                datObject => typeof datObject === "object" && Object.getPrototypeOf(datObject) === GsapBackOut, 
                gsapBackOutEase => createEaseBackOut(gsapBackOutEase._p1, gsapBackOutEase._p2),
                middlewareEase => Back.easeOut.config(middlewareEase.props.getValue("overshoot")),
                BackOut.property("overshoot", 1.7, mutateEaseBackOut, { min: 0.5, max: 5, step: 0.1 })
            )
            .preset(
                datObject => typeof datObject === "object" && Object.getPrototypeOf(datObject) === GsapBackInOut, 
                gsapBackOutEase => createEaseBackInOut(gsapBackOutEase._p1, gsapBackOutEase._p2),
                middlewareEase => Back.easeInOut.config(middlewareEase.props.getValue("overshoot")),
                BackInOut.property("overshoot", 1.7, mutateEaseBackInOut, { min: 0.5, max: 5, step: 0.1 })
            );

        if (typeof CustomEase === "function") {
            this.transform(
                datObject => datObject instanceof CustomEase,
                gsapEase => Ease.ofSVGPath(gsapEase.data),
                middlewareEase => CustomEase.create("custom", middlewareEase.svgPath));
        }
    }
}