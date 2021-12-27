import domTemplate from "./dom/gui.html";
import GUIViewEvent from "./GUIViewEvent";
import EasePanelDirector from "./dom/directors/EasePanelDirector";
import HTMLElementDirector from "./HTMLElementDirector";
import EaseEditorDirector from "./dom/directors/EaseEditorDirector";

class GUIView extends HTMLElementDirector {
    constructor(curves) {
        super(_renderTemplate(domTemplate));

        this._easePanelDirector = new EasePanelDirector(this._element, curves);
        this._easeEditorDirector = null;

        this._easePanelDirector.on(GUIViewEvent.CURVE_PRESET_SELECTED, (...args) => this.emit(GUIViewEvent.CURVE_PRESET_SELECTED, ...args));
        this._easePanelDirector.on(GUIViewEvent.ORIENTATION_PRESET_SELECTED, (...args) => this.emit(GUIViewEvent.ORIENTATION_PRESET_SELECTED, ...args));
        this._easePanelDirector.on(GUIViewEvent.EDIT_EASE_CLICKED, (...args) => this.emit(GUIViewEvent.EDIT_EASE_CLICKED, ...args));
    }

    setOrientations(orientations) {
        this._easePanelDirector.setOrientations(orientations);
    }

    setPreset(preset) {
        this._easePanelDirector.setPreset(preset);
        
        if (this._isEditorOpen()) {
            this._easeEditorDirector.ease = preset.ease;
        }
    }

    openEditor(initialEase) {
        if (this._isEditorOpen()) return;

        this._element.classList.remove("mode-select");
        this._element.classList.add("mode-edit");

        this._easeEditorDirector = new EaseEditorDirector(this._element);
        this._easeEditorDirector.on(GUIViewEvent.ACCEPT_EASE_EDIT_CLICKED, (...args) => this.emit(GUIViewEvent.ACCEPT_EASE_EDIT_CLICKED, ...args));
        this._easeEditorDirector.on(GUIViewEvent.DISCARD_EASE_EDIT_CLICKED, (...args) => this.emit(GUIViewEvent.DISCARD_EASE_EDIT_CLICKED, ...args));
        this._easeEditorDirector.on(GUIViewEvent.EASE_MODIFIED, (...args) => this.emit(GUIViewEvent.EASE_MODIFIED, ...args));
        this._easeEditorDirector.ease = initialEase;
    }

    closeEditor() {
        if (!this._isEditorOpen()) return;

        this._element.classList.remove("mode-edit");
        this._element.classList.add("mode-select");

        this._easeEditorDirector.cleanUp();
        this._easeEditorDirector = null;
    }

    get domElement() {
        return this._element;
    }

    _isEditorOpen() {
        return !!this._easeEditorDirector;
    }
}

function _renderTemplate(template) {
    return (new DOMParser()).parseFromString(template, "text/html").body.firstChild;
}

export {
    GUIViewEvent
};

export default GUIView;