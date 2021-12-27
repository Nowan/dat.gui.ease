import domTemplate from "./dom/gui.html";
import GUIViewEvent from "./GUIViewEvent";
import EasePanelDirector from "./dom/directors/EasePanelDirector";
import HTMLElementDirector from "./HTMLElementDirector";

class GUIView extends HTMLElementDirector {
    constructor(curves) {
        super(_renderTemplate(domTemplate));

        this._easePanelDirector = new EasePanelDirector(this._element, curves);

        this._easePanelDirector.on(GUIViewEvent.CURVE_PRESET_SELECTED, (...args) => this.emit(GUIViewEvent.CURVE_PRESET_SELECTED, ...args));
        this._easePanelDirector.on(GUIViewEvent.ORIENTATION_PRESET_SELECTED, (...args) => this.emit(GUIViewEvent.ORIENTATION_PRESET_SELECTED, ...args));
    }

    setOrientations(orientations) {
        this._easePanelDirector.setOrientations(orientations);
    }

    setPreset(preset) {
        this._easePanelDirector.setPreset(preset);
    }

    get domElement() {
        return this._element;
    }
}

function _renderTemplate(template) {
    return (new DOMParser()).parseFromString(template, "text/html").body.firstChild;
}

export {
    GUIViewEvent
};

export default GUIView;