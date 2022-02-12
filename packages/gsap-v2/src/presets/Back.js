import { EasePreset, presets } from "dat.gui.ease";
import cubicEquationRoots from "../utils/cubicEquationRoots";

const { BackIn: BackInMiddlewarePreset, BackOut: BackOutMiddlewarePreset, BackInOut: BackInOutMiddlewarePreset } = presets;
const DEFAULT_OVERSHOOT = 1.7;

class BackEasePreset extends EasePreset {
    constructor(backEaseMiddlewarePreset, mutatorFunction) {
        super(mutatorFunction(backEaseMiddlewarePreset.ease.clone(), DEFAULT_OVERSHOOT), backEaseMiddlewarePreset.curve, backEaseMiddlewarePreset.orientation);

        this.property("overshoot", DEFAULT_OVERSHOOT, mutatorFunction, { min: 0.5, max: 10, step: 0.1 });
    }
    
    createEase(c1, c3 = c1 + 1) {
        const ease = this.ease.clone();
        const property = ease.props.get("overshoot");

        property.value = c1;
        property.mutate(ease, c1, c3);

        return ease;
    }
}

export const BackIn = new BackEasePreset(BackInMiddlewarePreset, (ease, c1, c3 = c1 + 1) => {
    const roots = cubicEquationRoots(c3, c1, 0, 1);

    ease.lastAnchor.handle.y = Number(1 - c3 * roots[1].i).toFixed(3);

    return ease;
});

export const BackOut = new BackEasePreset(BackOutMiddlewarePreset, (ease, c1, c3 = c1 + 1) => {
    const roots = cubicEquationRoots(c3, c1, 0, 1);

    ease.firstAnchor.handle.y = Number((c3 * roots[1].i).toFixed(3));

    return ease;
});

export const BackInOut = new BackEasePreset(BackInOutMiddlewarePreset, (ease, c1, c3 = c1 + 1) => {
    const roots = cubicEquationRoots(c3, c1, 0, 1);
    const handleY = c3 * roots[1].i;

    ease.firstAnchor.handle.y = Number((1 - handleY).toFixed(3));
    ease.lastAnchor.handle.y = Number(handleY.toFixed(3));

    return ease;
});

export default BackEasePreset;