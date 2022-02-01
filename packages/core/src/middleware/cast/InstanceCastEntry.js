import EasePreset from "../../gui/model/preset/EasePreset";
import EasePresetProvider from "../../gui/model/preset/EasePresetProvider";
import CastEntry from "./CastEntry";

class InstanceCastEntry extends CastEntry {
    constructor(thirdPartyEase, nativeEasePresetOrPresetProvider) {
        super();
        
        this._thirdPartyEase = thirdPartyEase;
        this._preset = this._parseNativePreset(nativeEasePresetOrPresetProvider);
    }

    get preset() {
        return this._preset;
    }

    supportsCastInward(thirdPartyEase) {
        return this._thirdPartyEase === thirdPartyEase && !!this._preset;
    }

    supportsCastOutward(nativeEasePreset) {
        return this._preset.equals(nativeEasePreset) && !!this._thirdPartyEase;
    }

    castInward(thirdPartyEase) {
        return this._preset.clone();
    }

    castOutward(nativeEasePreset) {
        return this._thirdPartyEase;
    }

    static of(thirdPartyEase, nativeEasePresetOrPresetProvider) {
        return new InstanceCastEntry(...arguments);
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

export default InstanceCastEntry;