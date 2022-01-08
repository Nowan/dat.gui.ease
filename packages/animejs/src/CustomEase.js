import { Ease } from "dat.gui.ease";

// Provides custom easing function in accordance with
// https://animejs.com/documentation/#customEasing
function CustomEase(svgPath) {
    const ease = Ease.ofSVGPath(svgPath);
    const easingFunction = function(el, i, total) {
        return function(progress) {
            return ease.computeValue(progress);
        }
    }

    easingFunction.ease = ease;
    
    return easingFunction;
}

CustomEase.checkSignature = function(object) {
    return typeof object.ease === "object" && object.ease instanceof Ease;
}

export default CustomEase;