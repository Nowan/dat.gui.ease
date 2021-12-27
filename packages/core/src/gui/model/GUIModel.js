class GUIModel {
    constructor(middleware) {
        this._presets = _extractPresets(middleware);
        this._curves = _extractCurves(this._presets);
        this._orientationsMap = _extractOrientationsPerCurveMap(this._presets, this._curves);
        this._activePreset = null;
        this._preEditPreset = null;
    }

    get presets() {
        return this._presets;
    }

    get curves() {
        return this._curves;
    }

    get activePreset() {
        return this._activePreset;
    }

    set activePreset(preset) {
        this._activePreset = preset;
    }

    get preEditPreset() {
        return this._preEditPreset;
    }

    set preEditPreset(preset) {
        this._preEditPreset = preset;
    }

    getCurveOrientations(curve) {
        return this._orientationsMap.get(curve);
    }

    getMatchingPreset(curve, orientation) {
        return this._presets.find(preset => preset.curve === curve && preset.orientation === orientation);
    }

    getPresetMatchingEase(ease) {
        return this._presets.find(preset => preset.ease.equals(ease));
    }
}

function _extractPresets(middleware) {
    return middleware.castEntries.map(entry => entry.internal);
}

function _extractCurves(presets) {
    return presets.reduce((curves, preset) => curves.includes(preset.curve) ? curves : [...curves, preset.curve], []);
}

function _extractOrientationsPerCurveMap(presets, curves) {
    const orientationsMap = new Map();

    for (let curve of curves) {
        const curveMatchingPresets = presets.filter(preset => preset.curve === curve);
        const orientations = curveMatchingPresets.map(preset => preset.orientation);

        orientationsMap.set(curve, orientations);
    }

    return orientationsMap;
}

export default GUIModel;