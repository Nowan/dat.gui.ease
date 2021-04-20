import GSAPv2Middleware from "./middleware/GSAPv2Middleware";
import GSAPv3Middleware from "./middleware/GSAPv3Middleware";

export function v2(easeMap, CustomEase) {
    return new GSAPv2Middleware(easeMap, CustomEase);
}

export function v3(CustomEase) {
    return new GSAPv3Middleware(CustomEase);
}

export {
    GSAPv2Middleware,
    GSAPv3Middleware
}

export default {
    v2, 
    v3
}