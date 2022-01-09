import { Ease } from "dat.gui.ease";

// Provides custom easing function in accordance with
// https://github.com/tweenjs/tween.js/blob/master/docs/user_guide.md#using-a-custom-easing-function
function CustomEase(svgPath) {
    const ease = Ease.ofSVGPath(svgPath);
    const easingFunction = function(k) {
        return ease.computeValue(k);
    }

    easingFunction.ease = ease;
    
    return easingFunction;
}

CustomEase.checkSignature = function(object) {
    return typeof object.ease === "object" && object.ease instanceof Ease;
}

export default CustomEase;