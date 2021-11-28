import { Middleware, Curve, Ease } from "dat.gui.ease";
import easeEntries from "./entries";

export default class GSAPv3Middleware extends Middleware {
    constructor(CustomEase) {
        super(easeEntries);

        try {
            this._createCustomEase = this._extractCreatorMethod(CustomEase);
            this._isCustomEase = ease => ease instanceof CustomEase;
        }
        catch(error) {
            console.warn("Couldn't access CustomEase, ease editing disabled");
        }
    }

    isFormatSupported(ease) {
        return super.isFormatSupported(ease) || this._isCustomEaseSupported() && this._isCustomEase(ease)
    }

    import(externalEase) {
        if (this._isCustomEaseSupported() && this._isCustomEase(externalEase)) {
            return Ease.fromSVGPath(externalEase.data);
        }
        else {
            return super.import(externalEase);
        }
    }

    export(internalEase) {
        if (internalEase.curve === Curve.CUSTOM && this._isCustomEaseSupported()) {
            return this._createCustomEase(internalEase);
        }
        else {
            return super.export(internalEase);
        }
    }

    isEditingSupported() {
        return this._isCustomEaseSupported();
    }

    _isCustomEaseSupported() {
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