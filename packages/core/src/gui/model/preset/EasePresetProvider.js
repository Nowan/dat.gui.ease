class EasePresetProvider {
    constructor(providerFunction) {
        this._providerFunction = providerFunction;
        this._curveAlias = null;
        this._orientationAlias = null;
        this._props = {};
    }

    withAlias(curveAlias) {
        this._curveAlias = curveAlias;
        return this;
    }

    withOrientation(orientation) {
        this._orientationAlias = orientation;
        return this;
    }

    property(propertyName, defaultValue, mutationFunction, uiConfig) {
        this._props[propertyName] = {
            uiConfig,
            value: defaultValue,
            mutate: mutationFunction
        };
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

        for (let [propertyName, propertyEntry] of Object.entries(this._props)) {
            preset.property(propertyName, propertyEntry.value, propertyEntry.mutate, propertyEntry.uiConfig);
        }

        return preset;
    }

    static ofSample(preset) {
        return new EasePresetProvider(() => preset.clone());
    }

    static checkSignature(object) {
        return typeof object.next === "function";
    }
}

export default EasePresetProvider;