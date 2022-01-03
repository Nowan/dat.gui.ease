import EasePreset from "../../gui/model/preset/EasePreset";
import EasePresetProvider from "../../gui/model/preset/EasePresetProvider";
import CastEntry from "./CastEntry";

class PresetCastEntry extends CastEntry {
    constructor(thirdPartyEase, nativeEasePresetOrPresetProvider) {
        super();
        
        this.thirdPartyEase = thirdPartyEase;
        this.nativeEasePreset = this._parseNativePreset(nativeEasePresetOrPresetProvider);
    }

    get preset() {
        return this.nativeEasePreset;
    }

    supportsCastInward(thirdPartyEase) {
        return this.thirdPartyEase === thirdPartyEase && !!this.nativeEasePreset;
    }

    supportsCastOutward(nativeEasePreset) {
        return this.nativeEasePreset.equals(nativeEasePreset) && !!this.thirdPartyEase;
    }

    castInward(thirdPartyEase) {
        return this.nativeEasePreset;
    }

    castOutward(nativeEasePreset) {
        return this.thirdPartyEase;
    }

    static of(thirdPartyEase, nativeEasePresetOrPresetProvider) {
        return new PresetCastEntry(thirdPartyEase, nativeEasePresetOrPresetProvider);
    }

    _parseNativePreset(rawNativePreset) {
        if (rawNativePreset instanceof EasePresetProvider) {
            return rawNativePreset.next();
        }
        else if (rawNativePreset instanceof EasePreset) {
            return rawNativePreset.clone();
        }
        else {
            console.warn(`Native preset or preset provider expected`);
            console.log(rawNativePreset);
        }
    }
}

export default PresetCastEntry;