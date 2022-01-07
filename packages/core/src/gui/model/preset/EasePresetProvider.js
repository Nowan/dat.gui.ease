import { Orientation } from "./EasePreset";
import Curve from "./enum/Curve";

class EasePresetProvider {
    constructor(providerFunction) {
        this._providerFunction = providerFunction;
        this._curveAlias = null;
        this._orientationAlias = null;
    }

    withAlias(curveAlias) {
        this._curveAlias = curveAlias;
        return this;
    }

    withOrientation(orientation) {
        this._orientationAlias = orientation;
        return this;
    }

    next() {
        const preset = this._providerFunction();
        
        if (this._curveAlias) {
            preset.curve = this._curveAlias;
        }

        if (this._orientationAlias) {
            preset.orientation = this._orientationAlias;
        }

        return preset;
    }

    static ofSample(preset) {
        return new EasePresetProvider(() => preset.clone());
    }
}

export default EasePresetProvider;