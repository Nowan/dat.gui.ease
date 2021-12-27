import * as dat from "dat.gui";
import guiTemplate from "../view/dom/gui.html";
import Ease from '../model/ease/Ease';
import EasePreset, { Curve } from "../model/preset/EasePreset";
import EaseEditor, { EditorCurveChangeEvent } from "../view/editor/EaseEditor";
import interpret from "./interpret";
import GUIView, { GUIViewEvent } from "../view/GUIView";
import GUIModel from "../model/GUIModel";

export default class GUIController extends dat.controllers.Controller {
    constructor(object, property, middleware) {
        super(...arguments);
        
        const rawEase = object[property];
        const preset = middleware.import(rawEase);
        
        // this._orientation = ease.orientation;
        // this._ease = ease;
        // this._preEditEase = null;
        // this._editor = null;
        // this._view = new GUIView();

        this._middleware = middleware;
        this._model = new GUIModel(middleware);
        this._view = new GUIView(this._model.curves);

        this._model.activePreset = preset;

        this._view.setOrientations(this._model.getCurveOrientations(preset.curve));
        this._view.setPreset(preset);

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

    _initDOM() {
        this.domElement = this._view.domElement;
        
        this._initCurveSelector();
        this._initOrientationSelector();
        this._initCustomPathSelector();
        this._initButtons();
    }

    _initCurveSelector() {
        const curveSelectElement = this.domElement.querySelector(".curve-selector");
        const curves = [];

        for (let preset of this._middleware.presets) {
            if (curves.includes(preset.curve)) continue;
            curves.push(preset.curve);
            curveSelectElement.options.add(new Option(preset.displayName, preset.curve));
        }

        const custom = new Option(Curve.CUSTOM, Curve.CUSTOM);
        custom.setAttribute("hidden", true);
        curveSelectElement.options.add(custom);

        curveSelectElement.onchange = () => {
            const prevEase = this._ease;
            const curve = curveSelectElement.value;
            const orientations = this._getCurveOrientations(curve);
            const ease = this._getTemplateByCurveAndOrientation(curve, orientations.includes(prevEase.orientation) ? prevEase.orientation : orientations[0]); 

            this.setValue(ease.toString());
        };
    }

    _initOrientationSelector() {
        const orientationSelectElement = this.domElement.querySelector(".orientation-selector");

        orientationSelectElement.onchange = () => {
            const ease = this._getTemplateByCurveAndOrientation(this._ease.curve, orientationSelectElement.value); 

            this.setValue(ease.toString());
        };
    }

    _initCustomPathSelector() {
        const customPathSelectElement = this.domElement.querySelector(".path-selector");

        customPathSelectElement.oninput = event => {
            const svgPath = customPathSelectElement.value;

            try {
                this.setValue(Ease.fromSVGPath(svgPath).toString());
            }
            catch(e) {
                console.warn(`Couldn't parse SVG path ${svgPath}`);
            }
        }
    }

    _initButtons() {
        this._initEditButton();
        this._initCopyButton();
        this._initAcceptButton();
        this._initDeclineButton();
    }

    _initEditButton() {
        const buttonElement = this.domElement.querySelector(".edit-button");
        if (this._middleware.isEditingSupported()) {
            buttonElement.addEventListener("click", () => {
                this._preEditEase = this._ease;
                this._openEditor(this._ease);
            });
        }
        else {
            buttonElement.style.display = "none";
        }
    }

    _initCopyButton() {
        const buttonElement = this.domElement.querySelector(".copy-button");
        const pathInspectorElement = this.domElement.querySelector(".path-selector");

        buttonElement.addEventListener("click", () => {
            pathInspectorElement.select();
            document.execCommand("copy");
            console.info(`Copied ${pathInspectorElement.value}`);
        });
    }

    _initAcceptButton() {
        const buttonElement = this.domElement.querySelector(".accept-button");

        buttonElement.addEventListener("click", () => this._closeEditor());
    }

    _initDeclineButton() {
        const buttonElement = this.domElement.querySelector(".decline-button");

        buttonElement.addEventListener("click", () => {
            this._closeEditor();
            this.setValue(this._preEditEase.toString());
        });
    }

    _openEditor(ease) {
        this._toggleEditMode(true);
        const canvas = this.domElement.querySelector(".editor");
        const editor = new EaseEditor(canvas);
        editor.ease = ease;
        
        canvas.addEventListener(EditorCurveChangeEvent.KEY, () => {
            this.setValue(editor.ease.toString());
        });

        this._editor = editor;
    }

    _closeEditor() {
        // Hack to reset event listeners assigned by CurveJS to original canvas
        const canvas = this.domElement.querySelector(".editor");
        const canvasClone = canvas.cloneNode(true);

        canvas.parentNode.replaceChild(canvasClone, canvas);

        this._toggleEditMode(false);
        this._editor = null;
    }

    _updateElements(ease) {
        this._updateSelectors(ease);
        this._updatePathInspector(this._ease);
        this._updateCornerCurve(this._ease);
        
        if (this._editor) {
            this._editor.ease = this._ease;
        }
    }

    _updateOrientations(orientations = [], orientationToSelect = undefined) {
        const orientationSelectElement = this.domElement.querySelector(".orientation-selector");
        orientationSelectElement.options.length = 0;
        
        if (orientations.length > 0) {
            orientations.forEach(orientation => orientationSelectElement.options.add(new Option(orientation, orientation)));
            orientationSelectElement.value = orientations.includes(orientationToSelect) ? orientationToSelect : orientations[0];
            orientationSelectElement.removeAttribute("disabled");
        }
        else {
            orientationSelectElement.setAttribute("disabled", true);
        }
    }

    _updateSelectors(ease) {
        const curveSelectElement = this.domElement.querySelector(".curve-selector");
        const orientationSelectElement = this.domElement.querySelector(".orientation-selector");

        curveSelectElement.value = ease.curve;
        
        this._updatePathInspector(ease);
        this._updateOrientations(this._getCurveOrientations(ease.curve), ease.orientation);
        orientationSelectElement.value = ease.orientation;
    }

    _updateCornerCurve(ease) {
        const cornerCanvas = this.domElement.querySelector("canvas.corner-curve");
        const ctx = cornerCanvas.getContext("2d");
        const width = ctx.canvas.width = 60;
        const height = ctx.canvas.height = 60;

        ctx.strokeStyle = ctx.fillStyle = "#88CE02";
		ctx.lineWidth = 1;
        ctx.clearRect(0, 0, width, height);
        ctx.beginPath();
		ctx.moveTo(ease.firstAnchor.x * width, (1 - ease.firstAnchor.y) * height);
        
        for (let i = 0; i < ease.anchors.length; i += 2) {
            const startAnchor = ease.anchors[i];
            const endAnchor = ease.anchors[i + 1];

            ctx.bezierCurveTo(startAnchor.handle.x * width, (1 - startAnchor.handle.y) * height, endAnchor.handle.x * width, (1 - endAnchor.handle.y) * height, endAnchor.x * width, (1 - endAnchor.y) * height);
        }

        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.stroke();
        ctx.fill();
    }

    _updatePathInspector(ease) {
        const pathInspectorElement = this.domElement.querySelector(".path-selector");
        pathInspectorElement.value = Ease.toSVGPath(ease);
    }

    _toggleEditMode(flag) {
        if (flag) {
            this.domElement.classList.remove("mode-select");
            this.domElement.classList.add("mode-edit");
        }
        else {
            this.domElement.classList.remove("mode-edit");
            this.domElement.classList.add("mode-select");
        }
    }

    _getCurveOrientations(curve) {
        return this._getCurveTemplates(curve).map(template => template.orientation);
    }

    _getCurveTemplates(curve) {
        return this._middleware.presets.filter(preset => preset.curve === curve);
    }

    _getTemplateBySelectorsValues() {
        const curve = this.domElement.querySelector(".curve-selector").value;
        const orientation = this.domElement.querySelector(".orientation-selector").value;

        return this._getTemplateByCurveAndOrientation(curve, orientation);              
    }

    _getTemplateByCurveAndOrientation(curve, orientation) {
        return this._middleware.presets.find(preset => preset.curve === curve && preset.orientation === orientation);                
    }
};