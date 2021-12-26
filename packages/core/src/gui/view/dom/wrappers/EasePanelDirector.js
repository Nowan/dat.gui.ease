import HTMLElementDirector from "../../HTMLElementDirector";
import { easePanel } from "../selectors";
import CurveSelectorDirector from "./CurveSelectorDirector";
import OrientationSelectorDirector from "./OrientationSelectorDirector";
import GUIViewEvent from "../../GUIViewEvent";

export default class EasePanelDirector extends HTMLElementDirector {
    constructor(rootDomElement, curves, orientationsMap) {
        super(easePanel(rootDomElement));

        this._orientationsMap = orientationsMap;

        this._curveSelector = new CurveSelectorDirector(rootDomElement, curves);
        this._curveSelector.on(GUIViewEvent.CURVE_SELECTED, (...args) => this.emit(GUIViewEvent.CURVE_SELECTED, ...args));

        this._orientationSelector = new OrientationSelectorDirector(rootDomElement);
        this._orientationSelector.on(GUIViewEvent.ORIENTATION_SELECTED, (...args) => this.emit(GUIViewEvent.ORIENTATION_SELECTED, ...args));
    }

    setEase(curve, orientation) {
        this._curveSelector.value = curve;
        this._orientationSelector.options = this._orientationsMap.get(curve);
        this._orientationSelector.value = orientation
    }
}