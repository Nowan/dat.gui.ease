import { EasePreset, presets } from "dat.gui.ease";

const { Linear } = presets;

export const Power0 = Linear.withAlias("Power0");

export const Power1In = EasePreset.of("M0,0 C0.532,0 0.924,0.862 1,1", "Power1", EasePreset.ORIENTATION.IN);
export const Power1Out = EasePreset.of("M0,0 C0.104,0.204 0.492,1 1,1", "Power1", EasePreset.ORIENTATION.OUT);
export const Power1InOut = EasePreset.of("M0,0 C0.272,0 0.472,0.455 0.496,0.496 0.574,0.63 0.744,1 1,1", "Power1", EasePreset.ORIENTATION.IN_OUT);

export const Power2In = EasePreset.of("M0,0 C0.366,0 0.438,0.069 0.575,0.19 0.802,0.39 1,1 1,1", "Power2", EasePreset.ORIENTATION.IN);
export const Power2Out = EasePreset.of("M0,0 C0.126,0.382 0.282,0.674 0.44,0.822 0.632,1.002 0.818,1.001 1,1", "Power2", EasePreset.ORIENTATION.OUT);
export const Power2InOut = EasePreset.of("M0,0 C0.173,0 0.242,0.036 0.322,0.13 0.401,0.223 0.449,0.367 0.502,0.506 0.546,0.622 0.62,0.824 0.726,0.916 0.799,0.98 0.869,1 1,1", "Power2", EasePreset.ORIENTATION.IN_OUT);

export const Power3In = EasePreset.of("M0,0 C0.482,0 0.49,0.046 0.625,0.152 0.733,0.237 0.88,0.524 1,1", "Power3", EasePreset.ORIENTATION.IN);
export const Power3Out = EasePreset.of("M0,0 C0.083,0.294 0.182,0.718 0.448,0.908 0.579,1.001 0.752,1 1,1", "Power3", EasePreset.ORIENTATION.OUT);
export const Power3InOut = EasePreset.of("M0,0 C0.212,0 0.247,0.014 0.326,0.09 0.402,0.164 0.46,0.356 0.502,0.504 0.551,0.68 0.594,0.816 0.654,0.882 0.726,0.961 0.734,1 1,1", "Power3", EasePreset.ORIENTATION.IN_OUT);

export const Power4In = EasePreset.of("M0,0 C0.46,0 0.496,0.014 0.616,0.088 0.734,0.161 0.884,0.4 1,1", "Power4", EasePreset.ORIENTATION.IN);
export const Power4Out = EasePreset.of("M0,0 C0.11,0.494 0.192,0.726 0.318,0.852 0.45,0.984 0.504,1 1,1", "Power4", EasePreset.ORIENTATION.OUT);
export const Power4InOut = EasePreset.of("M0,0 C0.29,0 0.294,0.018 0.365,0.103 0.434,0.186 0.466,0.362 0.498,0.502 0.518,0.592 0.552,0.77 0.615,0.864 0.69,0.975 0.704,1 1,1", "Power4", EasePreset.ORIENTATION.IN_OUT);