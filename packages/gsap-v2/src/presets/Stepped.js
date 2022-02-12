import { Anchor, EasePreset, presets } from "dat.gui.ease"

const { Linear } = presets;
const DEFAULT_STEPS = 2;

export default class SteppedEasePreset extends EasePreset {
    constructor(mutatorFunction) {
        super(mutatorFunction(Linear.ease.clone(), DEFAULT_STEPS), "Stepped");

        this.property("steps", DEFAULT_STEPS, mutatorFunction, { min: 2, max: 20, step: 1 });
    }
    
    createEase(steps) {
        const ease = this.ease.clone();
        const property = ease.props.get("steps");

        property.value = steps;
        property.mutate(ease, steps);

        return ease;
    }
}

export const Stepped = new SteppedEasePreset((ease, numberOfSteps) => {
    const stepDeltaXY = 1 / numberOfSteps;

    ease.anchors.splice(0, ease.anchors.length, new Anchor(0, 0));
    
    for (let s = 0; s < numberOfSteps; s++) {
        const stepX = stepDeltaXY * (s + 1);
        const stepStartY = stepDeltaXY * s;
        const stepEndY = stepDeltaXY * (s + 1);
        const stepStartAnchorIndex = s * 4 + 1;

        ease.anchors[stepStartAnchorIndex] = new Anchor(stepX, stepStartY);
        ease.anchors[stepStartAnchorIndex + 1] = new Anchor(stepX, stepStartY);
        ease.anchors[stepStartAnchorIndex + 2] = new Anchor(stepX, stepEndY);
        ease.anchors[stepStartAnchorIndex + 3] = new Anchor(stepX, stepEndY);
    }

    ease.anchors.pop();
    
    return ease;
});