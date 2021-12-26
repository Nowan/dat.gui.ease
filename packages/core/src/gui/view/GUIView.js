import domTemplate from "./dom/gui.html";
import GUIViewEvent from "./GUIViewEvent";
import EasePanelDirector from "./dom/wrappers/EasePanelDirector";
import HTMLElementDirector from "./HTMLElementDirector";

class GUIView extends HTMLElementDirector {
    constructor(presets) {
        super(_renderTemplate(domTemplate));

        this._curves = _extractCurves(presets);
        this._orientationsMap = _extractOrientationsPerCurveMap(presets, this._curves);
        this._easePanelDirector = new EasePanelDirector(this._element, this._curves, this._orientationsMap);

        this._easePanelDirector.on(GUIViewEvent.CURVE_SELECTED, (...args) => this.emit(GUIViewEvent.CURVE_SELECTED, ...args));
        this._easePanelDirector.on(GUIViewEvent.ORIENTATION_SELECTED, (...args) => this.emit(GUIViewEvent.ORIENTATION_SELECTED, ...args));
    }

    setEase(curve, orientation) {
        this._easePanelDirector.setEase(curve, orientation);
    }

    get domElement() {
        return this._element;
    }

    _renderTemplate(template) {
        return (new DOMParser()).parseFromString(template, "text/html").body.firstChild;
    }
}

function _renderTemplate(template) {
    return (new DOMParser()).parseFromString(template, "text/html").body.firstChild;
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

export {
    GUIViewEvent
};

export default GUIView;