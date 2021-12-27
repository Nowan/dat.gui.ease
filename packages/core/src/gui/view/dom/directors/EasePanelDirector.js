import HTMLElementDirector from "../../HTMLElementDirector";
import { easePanel } from "../selectors";
import CurveSelectorDirector from "./CurveSelectorDirector";
import OrientationSelectorDirector from "./OrientationSelectorDirector";
import GUIViewEvent from "../../GUIViewEvent";
import EasePanelBackgroundDirector from "./EasePanelBackgroundDirector";

export default class EasePanelDirector extends HTMLElementDirector {
    constructor(rootDomElement, curves) {
        super(easePanel(rootDomElement));

        this._curveSelector = new CurveSelectorDirector(rootDomElement, curves);
        this._curveSelector.on(GUIViewEvent.CURVE_PRESET_SELECTED, (...args) => this.emit(GUIViewEvent.CURVE_PRESET_SELECTED, ...args));

        this._orientationSelector = new OrientationSelectorDirector(rootDomElement);
        this._orientationSelector.on(GUIViewEvent.ORIENTATION_PRESET_SELECTED, (...args) => this.emit(GUIViewEvent.ORIENTATION_PRESET_SELECTED, ...args));

        this._background = new EasePanelBackgroundDirector(rootDomElement);
    }

    setOrientations(orientations) {
        this._orientationSelector.values = orientations;
    }

    setPreset(preset) {
        this._curveSelector.value = preset.curve;
        this._orientationSelector.value = preset.orientation;
        this._background.refresh(preset.ease);
    }
}