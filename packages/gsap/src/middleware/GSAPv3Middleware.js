import GSAPMiddleware from "./GSAPMiddleware";
import GSAPv3EaseCaster from "../caster/GSAPv3EaseCaster";

export default class GSAPv3Middleware extends GSAPMiddleware {
    constructor(CustomEase) {
        super(new GSAPv3EaseCaster(CustomEase));
    }
}