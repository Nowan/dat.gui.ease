import EasePreset from "../../gui/model/preset/EasePreset";
import EasePresetProvider from "../../gui/model/preset/EasePresetProvider";
import CastEntry from "./CastEntry";

class PredicateCastEntry extends CastEntry {
    constructor(predicateFunction, thirdPartyToNativeCast, nativeToThirdPartyCast, nativeEasePresetOrPresetProvider) {
        super();

        this._predicate = predicateFunction;
        this._transformThirdPartyToNativeEase = thirdPartyToNativeCast;
        this._transformNativeToThirdPartyEase = nativeToThirdPartyCast;
        this._preset = this._parseNativePreset(nativeEasePresetOrPresetProvider);
    }

    get preset() {
        return this._preset;
    }

    supportsCastInward(thirdPartyEase) {
        return this._predicate(thirdPartyEase) && this._transformThirdPartyToNativeEase;
    }

    castInward(thirdPartyEase) {
        const preset = this._preset.clone();
        preset.ease = this._transformThirdPartyToNativeEase(thirdPartyEase);
        return preset;
    }

    supportsCastOutward(nativeEasePreset) {
        return nativeEasePreset.curve === this._preset.curve && nativeEasePreset.orientation === this._preset.orientation;
    }

    castOutward(nativeEasePreset) {
        return this._transformNativeToThirdPartyEase(nativeEasePreset.ease);
    }

    static of(predicateFunction, thirdPartyToNativeCast, nativeToThirdPartyCast, nativeEasePresetOrPresetProvider) {
        return new PredicateCastEntry(...arguments);
    }

    _parseNativePreset(rawNativePreset) {
        // instanceof seems broken after transpilation, added temporary signature checks
        if (rawNativePreset instanceof EasePresetProvider || EasePresetProvider.checkSignature(rawNativePreset)) {
            return rawNativePreset.next();
        }
        else if (rawNativePreset instanceof EasePreset || EasePreset.checkSignature(rawNativePreset)) {
            return rawNativePreset.clone();
        }
        else {
            console.warn(`Native preset or preset provider expected. Instead got `, rawNativePreset);
        }
    }
}

export default PredicateCastEntry;