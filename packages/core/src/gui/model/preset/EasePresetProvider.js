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

    property(propertyName, defaultValue) {
        this._props[propertyName] = defaultValue;
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

        for (let propertyName in this._props) {
            preset.property(propertyName, this._props[propertyName]);
        }

        return preset;
    }

    static ofSample(preset) {
        return new EasePresetProvider(() => preset.clone());
    }
}

export default EasePresetProvider;