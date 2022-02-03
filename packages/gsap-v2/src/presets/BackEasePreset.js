import { EasePreset, presets } from "dat.gui.ease";
import cubicEquationRoots from "../utils/cubicEquationRoots";

const { BackIn, BackOut, BackInOut } = presets;
const DEFAULT_OVERSHOOT = 1.7;

export default class BackEasePreset extends EasePreset {
    constructor(backEasePresetProvider, mutatorFunction) {
        super(mutatorFunction(backEasePresetProvider.ease.clone(), DEFAULT_OVERSHOOT), backEasePresetProvider.curve, backEasePresetProvider.orientation);

        this.property("overshoot", DEFAULT_OVERSHOOT, mutatorFunction, { min: 0.5, max: 10, step: 0.1 });
    }
    
    createEase(c1, c3 = c1 + 1) {
        const ease = this.ease.clone();
        const property = ease.props.get("overshoot");

        property.value = c1;
        property.mutate(ease, c1, c3);

        return ease;
    }

    static get IN() {
        return new BackEasePreset(BackIn, (ease, c1, c3 = c1 + 1) => {
            const roots = cubicEquationRoots(c3, c1, 0, 1);

            ease.lastAnchor.handle.y = Number(1 - c3 * roots[1].i).toFixed(3);

            return ease;
        });
    }

    static get OUT() {
        return new BackEasePreset(BackOut, (ease, c1, c3 = c1 + 1) => {
            const roots = cubicEquationRoots(c3, c1, 0, 1);

            ease.firstAnchor.handle.y = Number((c3 * roots[1].i).toFixed(3));

            return ease;
        });
    }

    static get IN_OUT() {
        return new BackEasePreset(BackInOut, (ease, c1, c3 = c1 + 1) => {
            const roots = cubicEquationRoots(c3, c1, 0, 1);
            const handleY = c3 * roots[1].i;

            ease.firstAnchor.handle.y = Number((1 - handleY).toFixed(3));
            ease.lastAnchor.handle.y = Number(handleY.toFixed(3));

            return ease;
        });
    }
}