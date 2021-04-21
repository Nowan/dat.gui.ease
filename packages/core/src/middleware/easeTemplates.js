import EaseTemplate, { Curve, Orientation } from "../gui/ease/EaseTemplate";

// Predefined list of easings commonly used across many animation engines
export const Linear = new EaseTemplate(Curve.LINEAR, Orientation.NONE, [0, 0, 1, 1]);

export const SineIn = new EaseTemplate(Curve.SINE, Orientation.IN, [0.12, 0, 0.39, 0]);
export const SineOut = new EaseTemplate(Curve.SINE, Orientation.OUT, [0.61, 1, 0.88, 1]);
export const SineInOut = new EaseTemplate(Curve.SINE, Orientation.IN_OUT, [0.37, 0, 0.63, 1]);

export const QuadIn = new EaseTemplate(Curve.QUAD, Orientation.IN, [0.11, 0, 0.5, 0]);
export const QuadOut = new EaseTemplate(Curve.QUAD, Orientation.OUT, [0.5, 1, 0.89, 1]);
export const QuadInOut = new EaseTemplate(Curve.QUAD, Orientation.IN_OUT, [0.45, 0, 0.55, 1]);

export const CubicIn = new EaseTemplate(Curve.CUBIC, Orientation.IN, [0.32, 0, 0.67, 0]);
export const CubicOut = new EaseTemplate(Curve.CUBIC, Orientation.OUT, [0.33, 1, 0.68, 1]);
export const CubicInOut = new EaseTemplate(Curve.CUBIC, Orientation.IN_OUT, [0.65, 0, 0.35, 1]);

export const QuartIn = new EaseTemplate(Curve.QUART, Orientation.IN, [0.5, 0, 0.75, 0]);
export const QuartOut = new EaseTemplate(Curve.QUART, Orientation.OUT, [0.25, 1, 0.5, 1]);
export const QuartInOut = new EaseTemplate(Curve.QUART, Orientation.IN_OUT, [0.76, 0, 0.24, 1]);

export const QuintIn = new EaseTemplate(Curve.QUINT, Orientation.IN, [0.64, 0, 0.78, 0]);
export const QuintOut = new EaseTemplate(Curve.QUINT, Orientation.OUT, [0.22, 1, 0.36, 1]);
export const QuintInOut = new EaseTemplate(Curve.QUINT, Orientation.IN_OUT, [0.83, 0, 0.17, 1]);

export const ExpoIn = new EaseTemplate(Curve.EXPO, Orientation.IN, [0.7, 0, 0.84, 0]);
export const ExpoOut = new EaseTemplate(Curve.EXPO, Orientation.OUT, [0.16, 1, 0.3, 1]);
export const ExpoInOut = new EaseTemplate(Curve.EXPO, Orientation.IN_OUT, [0.87, 0, 0.13, 1]);

export const CircIn = new EaseTemplate(Curve.CIRC, Orientation.IN, [0.55, 0, 1, 0.45]);
export const CircOut = new EaseTemplate(Curve.CIRC, Orientation.OUT, [0, 0.55, 0.45, 1]);
export const CircInOut = new EaseTemplate(Curve.CIRC, Orientation.IN_OUT, [0.85, 0, 0.15, 1]);

export const BackIn = new EaseTemplate(Curve.BACK, Orientation.IN, [0.36, 0, 0.66, -0.56]);
export const BackOut = new EaseTemplate(Curve.BACK, Orientation.OUT, [0.34, 1.56, 0.64, 1]);
export const BackInOut = new EaseTemplate(Curve.BACK, Orientation.IN_OUT, [0.68, -0.6, 0.32, 1.6]);

export const Custom = new EaseTemplate(Curve.CUSTOM, Orientation.NONE, [0, 0, 1, 1]);