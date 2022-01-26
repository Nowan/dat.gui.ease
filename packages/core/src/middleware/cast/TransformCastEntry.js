import EasePreset, { Curve } from "../../gui/model/preset/EasePreset";
import CastEntry from "./CastEntry";

class TransformCastEntry extends CastEntry {
    constructor(predicateFunction, thirdPartyToNativeCast, nativeToThirdPartyCast) {
        super();

        this._predicate = predicateFunction;
        this._transformThirdPartyToNativeEase = thirdPartyToNativeCast;
        this._transformNativeToThirdPartyEase = nativeToThirdPartyCast;
    }

    supportsCastInward(thirdPartyEase) {
        return this._predicate(thirdPartyEase) && this._transformThirdPartyToNativeEase;
    }

    castInward(thirdPartyEase) {
        return new EasePreset(this._transformThirdPartyToNativeEase(thirdPartyEase), Curve.CUSTOM);
    }

    castOutward(nativeEasePreset) {
        return this._transformNativeToThirdPartyEase(nativeEasePreset.ease);
    }

    static of(predicateFunction, thirdPartyToNativeCast, nativeToThirdPartyCast) {
        return new TransformCastEntry(...arguments);
    }
}

export default TransformCastEntry;