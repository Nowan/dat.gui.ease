import GSAPEaseCaster from "./GSAPEaseCaster";
import { templates as Template, Curve, Orientation } from "dat.gui.ease";

const templates = Object.values(Template);

const curvesMap = new Map([
    ["Power0", Curve.LINEAR],
    ["Power1", Curve.SINE],
    ["Power2", Curve.CUBIC],
    ["Power3", Curve.QUART],
    ["Power4", Curve.QUINT],
    ["Expo", Curve.EXPO],
    ["Circ", Curve.CIRC]
])

const orientationsMap = new Map([
    ["easeNone", Orientation.NONE],
    ["easeIn", Orientation.IN],
    ["easeOut", Orientation.OUT],
    ["easeInOut", Orientation.IN_OUT]
])

export default class GSAPv2EaseCaster extends GSAPEaseCaster {
    constructor(easeMap, CustomEase) {
        super();

        this._castMap = this._createCastMap(easeMap);
        
        try {
            this._createCustomEase = this._extractCreatorMethod(CustomEase);
        }
        catch(error) {
            console.warn("Couldn't access CustomEase, curve editing disabled");
        }
    }

    _createCastMap(easeMap = {}) {
        const castMap = new Map();
        const curves = Array.from(curvesMap.keys());
        const orientations = Array.from(orientationsMap.keys());
        const easePattern = new RegExp(`${curves.join("|")}\\.${orientations.join("|")}`);

        for (let [easeName, externalEase] of Object.entries(easeMap)) {
            if (easePattern.test(easeName)) {
                const [rawCurve, rawOrientation] = easeName.split(".");
                const curve = curvesMap.get(rawCurve);
                const orientation = orientationsMap.get(rawOrientation);
                const internalEase = templates.find(template => template.curve === curve && template.orientation === orientation);

                if (internalEase) {
                    castMap.set(externalEase, internalEase);
                }
            }
        }

        return castMap;
    }
}
