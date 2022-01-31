import * as dat from "dat.gui";
import Ease from '../model/ease/Ease';
import EasePreset from "../model/preset/EasePreset";
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
        this._view.on(GUIViewEvent.PROPERTY_MODIFIED, this._onPropertyModified.bind(this));
        this._view.on(GUIViewEvent.EDIT_EASE_CLICKED, this._onEditEaseClicked.bind(this));
        this._view.on(GUIViewEvent.EASE_MODIFIED, this._onEaseModified.bind(this));
        this._view.on(GUIViewEvent.ACCEPT_EASE_EDIT_CLICKED, this._onAcceptEaseEditClicked.bind(this));
        this._view.on(GUIViewEvent.DISCARD_EASE_EDIT_CLICKED, this._onDiscardEaseEditClicked.bind(this));

        this.domElement = this._view.domElement;
        this._onValueModified = null;
    }

    // Called from dat.GUI to store serialized value in revertable preset
    // (part of dat.GUi.prototype.remember() functionality)
    getValue() {
        return this._model.activePreset.ease.toString();
    }

    // Called from dat.GUI upon initializing with remembered value
    // or once preset is reverted
    setValue(easeSvgPath) {
        const ease = Ease.fromSVGPath(easeSvgPath);
        const matchingPreset = this._model.getPresetMatchingEase(ease);
        
        if (matchingPreset) {
            this._model.activePreset = matchingPreset;
        }
        else {
            this._model.activePreset = new EasePreset(ease, EasePreset.CURVE.CUSTOM, EasePreset.ORIENTATION.NONE);
        }
        
        this._view.setOrientations(this._model.getCurveOrientations(this._model.activePreset.curve));
        this._view.setPreset(this._model.activePreset);

        this._applyRevertedValue(this._model.activePreset);
    }

    set onValueModified(callback) {
        this._onValueModified = callback;
    }

    _applyValue(preset) {
        this._applyRevertedValue(preset);

        if (this._onValueModified) {
            this._onValueModified();
        }
    }

    _applyRevertedValue(preset) {
        const externalEase = this._middleware.export(preset);
        this.object[this.property] = externalEase;
        
        if (this.__onChange) {
            this.__onChange.call(this, externalEase);
        }
        if (this.__onFinishChange) {
            this.__onFinishChange.call(this, externalEase);
        }

        this.updateDisplay();
    }

    _onCurvePresetSelected(nextCurve) {
        const { orientation: currentOrientation } = this._model.activePreset;
        const nextOrientations = this._model.getCurveOrientations(nextCurve);
        const nextOrientation = nextOrientations.includes(currentOrientation) ? currentOrientation : nextOrientations[0];
        const nextPreset = this._model.getMatchingPreset(nextCurve, nextOrientation);

        this._model.activePreset.ease.props.resetValues();
        this._model.activePreset = nextPreset;

        this._view.setOrientations(nextOrientations);
        this._view.setPreset(nextPreset);

        this._applyValue(nextPreset);
    }

    _onOrientationPresetSelected(nextOrientation) {
        const nextPreset = this._model.getMatchingPreset(this._model.activePreset.curve, nextOrientation);
        nextPreset.ease.props.copyValues(this._model.activePreset.ease.props);

        this._model.activePreset = nextPreset;
        this._view.setPreset(nextPreset);

        this._applyValue(nextPreset);
    }

    _onPropertyModified(propertyName, value) {
        const preset = this._model.activePreset;
        const ease = preset.ease;
        const property = ease.props.get(propertyName);

        property.value = value;
        property.mutate(ease, value);

        this._view.setPreset(preset);
        this._applyValue(preset);
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
        this._applyValue(this._model.activePreset);
    }

    _onAcceptEaseEditClicked() {
        this._view.closeEditor();
        this._view.setPreset(this._model.activePreset);
        this._applyValue(this._model.activePreset);
    }

    _onDiscardEaseEditClicked() {
        this._model.activePreset = this._model.preEditPreset;
        this._view.closeEditor();
        this._view.setPreset(this._model.activePreset);
        this._applyValue(this._model.activePreset);
    }
};