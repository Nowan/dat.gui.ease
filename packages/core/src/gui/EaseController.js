import * as dat from "dat.gui";
import guiTemplate from "./dom/gui.html";
import guiStyle from "./dom/gui.scss";
import Ease, { Curve } from './ease/Ease';
import EaseEditor, { EditorCurveChangeEvent } from "./editor/EaseEditor";

export default class EaseController extends dat.controllers.Controller {
    constructor(object, property, middleware) {
        super(...arguments);
        
        this._middleware = middleware;
        this._initDOM();

        const rawEase = object[property];
        const ease = middleware.import(rawEase);
        this._orientation = ease.orientation;
        this._ease = ease;
        this._editor = null;
        this._isCustomCurve = ease.curve === Curve.CUSTOM;

        this.domElement.querySelector(".property-name").innerHTML = property;
        this._updateSelectors(ease);
        this._updateCornerCurve(ease);
    }

    setValue(ease) {
        super.setValue(this._middleware.export(ease));
    }

    _initDOM() {
        this.domElement = this._renderTemplate(guiTemplate);
        
        this._initCurveSelector();
        this._initOrientationSelector();
        this._initCustomPathSelector();
        this._initButtons();
    }

    _initCurveSelector() {
        const curveSelectElement = this.domElement.querySelector(".curve-selector");
        const curves = new Set(this._middleware.templates.map(ease => ease.curve));

        for (let curve of curves) {
            curveSelectElement.options.add(new Option(curve, curve));
        }

        const custom = new Option(Curve.CUSTOM, Curve.CUSTOM);
        custom.setAttribute("hidden", true);
        curveSelectElement.options.add(custom);

        curveSelectElement.onchange = () => {
            const curve = curveSelectElement.value;
            const prevEase = this._ease;
            
            this._updateOrientations(this._getCurveOrientations(curve), prevEase.orientation);
            this._ease = this._getEaseTemplate();

            if (this._editor) {
                this._editor.ease = this._ease;
            }

            this._updatePathInspector(this._ease);
            this._updateCornerCurve(this._ease);
            this.setValue(this._ease);
        };
    }

    _initOrientationSelector() {
        const orientationSelectElement = this.domElement.querySelector(".orientation-selector");

        orientationSelectElement.onchange = () => {
            this._ease = this._getEaseTemplate();

            if (this._editor) {
                this._editor.ease = this._ease;
            }

            this._updatePathInspector(this._ease);
            this._updateCornerCurve(this._ease);
            this.setValue(this._ease);
        };
    }

    _initCustomPathSelector() {
        const customPathSelectElement = this.domElement.querySelector(".path-selector");

        customPathSelectElement.oninput = (value) => {
            const svgPath = customPathSelectElement.value;

            try {
                const ease = Ease.fromSVGPath(customPathSelectElement.value);

                this._editor.ease = ease;
                this._updateCornerCurve(ease);
                this.setValue(ease);
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
            this._ease = this._preEditEase;
            
            this._updateSelectors(this._ease);
            this._updateCornerCurve(this._ease);
            this.setValue(this._ease);
        });
    }

    _openEditor(ease) {
        this._toggleEditMode(true);
        const canvas = this.domElement.querySelector(".editor");
        const editor = new EaseEditor(canvas);
        const curveSelectElement = this.domElement.querySelector(".curve-selector");
        editor.ease = ease;
        
        canvas.addEventListener(EditorCurveChangeEvent.KEY, () => {
            this._ease = editor.ease;

            this._updateSelectors(this._ease);
            this._updateCornerCurve(this._ease);
            this.setValue(this._ease);
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
        const customPathSelectElement = this.domElement.querySelector(".path-selector");

        curveSelectElement.value = ease.curve;
        customPathSelectElement.value = ease.toString();
        
        this._updateOrientations(this._getCurveOrientations(ease.curve), ease.orientation);
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
        pathInspectorElement.value = ease.toString();
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

    _toggleCustomPathMode(flag) {
        if (flag) {
            this.domElement.classList.add("mode-custom-path");
        }
        else {
            this.domElement.classList.remove("mode-custom-path");
        }
    }

    _renderTemplate(template) {
        return (new DOMParser()).parseFromString(template, "text/html").body.firstChild;
    }

    _getCurveOrientations(curve) {
        return this._getCurveTemplates(curve).map(template => template.orientation);
    }

    _getCurveTemplates(curve) {
        return this._middleware.templates.filter(template => template.curve === curve);
    }

    _getEaseTemplate() {
        const curve = this.domElement.querySelector(".curve-selector").value;
        const orientation = this.domElement.querySelector(".orientation-selector").value;

        return this._middleware.templates.find(template => template.curve === curve && template.orientation === orientation);                
    }
};