import { EaseCaster, Curve } from "dat.gui.ease";

export default class GSAPEaseCaster extends EaseCaster {
    constructor(CustomEase) {
        super();
        
        try {
            this._createCustomEase = this._extractCreatorMethod(CustomEase);
        }
        catch(error) {
            console.warn("Couldn't access CustomEase, curve editing disabled");
        }
    }

    internalToExternal(internalEase) {
        if (internalEase.curve === Curve.CUSTOM && this.isCustomEaseSupported()) {
            return this._createCustomEase(internalEase);
        }
        else {
            return super.internalToExternal(internalEase);
        }
    }

    isCustomEaseSupported() {
        return !!this._createCustomEase;
    }

    _extractCreatorMethod(CustomEase) {
        if (typeof CustomEase === "function") {
            return function createCustomEase(ease) {
                if (typeof CustomEase.create === "function") {
                    return CustomEase.create("custom", ease.toString());
                }
                else {
                    return new CustomEase("custom", ease.toString());
                }
            }
        }
    }
}