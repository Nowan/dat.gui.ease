import EasePreset, { Curve, Orientation } from "./EasePreset";
import EasePresetProvider from "./EasePresetProvider";

// Predefined list of easings commonly used across various animation engines
// https://easings.net/

export const Linear = EasePresetProvider.ofSample(EasePreset.of("M 0,0 C 0,0 1,1 1,1", Curve.LINEAR, Orientation.NONE));

export const SineIn = EasePresetProvider.ofSample(EasePreset.of("M 0,0 C 0.12,0 0.39,0 1,1", Curve.SINE, Orientation.IN));
export const SineOut = EasePresetProvider.ofSample(EasePreset.of("M 0,0 C 0.61,1 0.88,1 1,1", Curve.SINE, Orientation.OUT));
export const SineInOut = EasePresetProvider.ofSample(EasePreset.of("M 0,0 C 0.37,0 0.63,1 1,1", Curve.SINE, Orientation.IN_OUT));

export const QuadIn = EasePresetProvider.ofSample(EasePreset.of("M 0,0 C 0.11,0 0.5,0 1,1", Curve.QUAD, Orientation.IN));
export const QuadOut = EasePresetProvider.ofSample(EasePreset.of("M 0,0 C 0.5,1 0.89,1 1,1", Curve.QUAD, Orientation.OUT));
export const QuadInOut = EasePresetProvider.ofSample(EasePreset.of("M 0,0 C 0.45,0 0.55,1 1,1", Curve.QUAD, Orientation.IN_OUT));

export const CubicIn = EasePresetProvider.ofSample(EasePreset.of("M 0,0 C 0.32,0 0.67,0 1,1", Curve.CUBIC, Orientation.IN));
export const CubicOut = EasePresetProvider.ofSample(EasePreset.of("M 0,0 C 0.33,1 0.68,1 1,1", Curve.CUBIC, Orientation.OUT));
export const CubicInOut = EasePresetProvider.ofSample(EasePreset.of("M 0,0 C 0.65,0 0.35,1 1,1", Curve.CUBIC, Orientation.IN_OUT));

export const QuartIn = EasePresetProvider.ofSample(EasePreset.of("M 0,0 C 0.5,0 0.75,0 1,1", Curve.QUART, Orientation.IN));
export const QuartOut = EasePresetProvider.ofSample(EasePreset.of("M 0,0 C 0.25,1 0.5,1 1,1", Curve.QUART, Orientation.OUT));
export const QuartInOut = EasePresetProvider.ofSample(EasePreset.of("M 0,0 C 0.76,0 0.24,1 1,1", Curve.QUART, Orientation.IN_OUT));

export const ExpoIn = EasePresetProvider.ofSample(EasePreset.of("M 0,0 C 0.7,0 0.84,0 1,1", Curve.EXPO, Orientation.IN));
export const ExpoOut = EasePresetProvider.ofSample(EasePreset.of("M 0,0 C 0.16,1 0.3,1 1,1", Curve.EXPO, Orientation.OUT));
export const ExpoInOut = EasePresetProvider.ofSample(EasePreset.of("M 0,0 C 0.87,0 0.13,1 1,1", Curve.EXPO, Orientation.IN_OUT));

export const CircIn = EasePresetProvider.ofSample(EasePreset.of("M 0,0 C 0.55,0 1,0.45 1,1", Curve.CIRC, Orientation.IN));
export const CircOut = EasePresetProvider.ofSample(EasePreset.of("M 0,0 C 0,0.55 0.45,1 1,1", Curve.CIRC, Orientation.OUT));
export const CircInOut = EasePresetProvider.ofSample(EasePreset.of("M 0,0 C 0.85,0 0.15,1 1,1", Curve.CIRC, Orientation.IN_OUT));

export const BackIn = EasePresetProvider.ofSample(EasePreset.of("M 0,0 C 0.36,0 0.66,-0.56 1,1", Curve.BACK, Orientation.IN));
export const BackOut = EasePresetProvider.ofSample(EasePreset.of("M 0,0 C 0.34,1.56 0.64,1 1,1", Curve.BACK, Orientation.OUT));
export const BackInOut = EasePresetProvider.ofSample(EasePreset.of("M 0,0 C 0.68,-0.6 0.32,1.6 1,1", Curve.BACK, Orientation.IN_OUT));