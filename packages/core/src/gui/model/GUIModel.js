class GUIModel {
    constructor(middleware) {
        this._presets = _extractPresets(middleware);
        this._ease = null;

        console.log(this._presets);
        
    }

    get presets() {
        return this._presets;
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