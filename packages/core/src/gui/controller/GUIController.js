import * as dat from "dat.gui";
import Ease from '../model/ease/Ease';
import EasePreset from "../model/preset/EasePreset";
import interpret from "./interpret";
import GUIView, { GUIViewEvent } from "../view/GUIView";
import GUIModel from "../model/GUIModel";

export default class GUIController extends dat.controllers.Controller {
    constructor(object, property, middleware) {
        super(...arguments);
        
        const rawEase = object[property];
        const preset = middleware.import(rawEase);

        this._middleware = middleware;
        this._model = new GUIModel(middleware);
        this._view = new GUIView(this._model.curves);

        this._model.activePreset = preset;

        this._view.setOrientations(this._model.getCurveOrientations(preset.curve));
        this._view.setPreset(preset);
        
        if (this._middleware.isEditingSupported()) {
            this._view.showEditButton();
        }

        this._view.on(GUIViewEvent.CURVE_PRESET_SELECTED, this._onCurvePresetSelected.bind(this));
        this._view.on(GUIViewEvent.ORIENTATION_PRESET_SELECTED, this._onOrientationPresetSelected.bind(this));
        this._view.on(GUIViewEvent.EDIT_EASE_CLICKED, this._onEditEaseClicked.bind(this));
        this._view.on(GUIViewEvent.EASE_MODIFIED, this._onEaseModified.bind(this));
        this._view.on(GUIViewEvent.ACCEPT_EASE_EDIT_CLICKED, this._onAcceptEaseEditClicked.bind(this));
        this._view.on(GUIViewEvent.DISCARD_EASE_EDIT_CLICKED, this._onDiscardEaseEditClicked.bind(this));

        this.domElement = this._view.domElement;
    }

    getValue() {
        return this._ease.toString();
    }

    // Use primitive type here to support serialization for `dat.GUI.prototype.getSaveObject()`
    setValue(easeString) {
        this._ease = interpret(easeString);
        this._applyValue(this._ease);
    }

    isModified() {
        return this.initialValue.toString() !== this._ease.toString();
    }

    _onCurvePresetSelected(nextCurve) {
        const { orientation: currentOrientation } = this._model.activePreset;
        const nextOrientations = this._model.getCurveOrientations(nextCurve);
        const nextOrientation = nextOrientations.includes(currentOrientation) ? currentOrientation : nextOrientations[0];
        const nextPreset = this._model.getMatchingPreset(nextCurve, nextOrientation);

        this._model.activePreset = nextPreset;

        this._view.setOrientations(nextOrientations);
        this._view.setPreset(nextPreset);
    }

    _onOrientationPresetSelected(nextOrientation) {
        const nextPreset = this._model.getMatchingPreset(this._model.activePreset.curve, nextOrientation);

        this._model.activePreset = nextPreset;
        this._view.setPreset(nextPreset);
    }

    _onEditEaseClicked() {
        this._model.preEditPreset = this._model.activePreset.clone();

        this._view.openEditor(this._model.activePreset.ease);
    }

    _onEaseModified(modifiedEase) {
        const matchingPreset = this._model.getPresetMatchingEase(modifiedEase);

        if (matchingPreset) {
            this._model.activePreset = matchingPreset;
        }
        else {
            this._model.activePreset = new EasePreset(modifiedEase, EasePreset.CURVE.CUSTOM, EasePreset.ORIENTATION.NONE);
        }

        this._view.setPreset(this._model.activePreset);
    }

    _onAcceptEaseEditClicked() {
        this._view.closeEditor();
        this._view.setPreset(this._model.activePreset);
    }

    _onDiscardEaseEditClicked() {
        this._model.activePreset = this._model.preEditPreset;
        this._view.closeEditor();
        this._view.setPreset(this._model.activePreset);
    }

    _applyValue(ease) {
        this.object[this.property] = this._middleware.export(ease);
        if (this.__onChange) {
            this.__onChange.call(this, ease);
        }
        if (this.__onFinishChange) {
            this.__onFinishChange.call(this, ease);
        }
        this._updateElements(ease);
        this.updateDisplay();
    }
};