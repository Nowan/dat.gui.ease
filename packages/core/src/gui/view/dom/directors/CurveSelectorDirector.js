import HTMLElementDirector from "../../HTMLElementDirector";
import { curveSelector } from "../selectors";
import { Curve } from "../../../model/preset/EasePreset";
import GUIViewEvent from  "../../GUIViewEvent";

export default class CurveSelectorDirector extends HTMLElementDirector {
    constructor(rootDomElement, curves) {
        super(curveSelector(rootDomElement));

        for (let option of this._composeOptions(curves)) {
            this._element.options.add(option);
        }

        this._element.onchange = () => this.emit(GUIViewEvent.CURVE_PRESET_SELECTED, this._element.value);
    }

    set value(curve) {
        this._element.value = curve;
    }

    _composeOptions(curves) {
        const options = curves.map(curve => new Option(curve, curve));

        return [...options, this._createCustomCurveOption()];
    }
    
    _createCustomCurveOption() {
        const customCurveOption = new Option(Curve.CUSTOM, Curve.CUSTOM);
        customCurveOption.setAttribute("hidden", true);
        return customCurveOption;
    }
}