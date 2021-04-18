import GSAPMiddleware from "./GSAPMiddleware";
import GSAPv2EaseCaster from "../caster/GSAPv2EaseCaster";

export default class GSAPv2Middleware extends GSAPMiddleware {
    constructor(easeMap, CustomEase) {
        super(new GSAPv2EaseCaster(easeMap, CustomEase));
    }
}