import EasePreset, { Curve } from "../../gui/model/preset/EasePreset";
import CastEntry from "./CastEntry";

class TransformCastEntry extends CastEntry {
    constructor(selectorPredicate, thirdPartyToNativeCast, nativeToThirdPartyCast) {
        super();

        this._selectorPredicate = selectorPredicate;
        this._transformThirdPartyToNativeEase = thirdPartyToNativeCast;
        this._transformNativeToThirdPartyEase = nativeToThirdPartyCast;
    }

    supportsCastInward(thirdPartyEase) {
        return this._selectorPredicate(thirdPartyEase);
    }

    castInward(thirdPartyEase) {
        return new EasePreset(this._transformThirdPartyToNativeEase(thirdPartyEase), Curve.CUSTOM);
    }

    castOutward(nativeEasePreset) {
        return this._transformNativeToThirdPartyEase(nativeEasePreset.ease);
    }

    static of(selectorPredicate, thirdPartyToNativeCast, nativeToThirdPartyCast) {
        return new TransformCastEntry(...arguments);
    }
}

export default TransformCastEntry;