import HTMLElementDirector from "../../HTMLElementDirector";
import { orientationSelector } from "../selectors";
import GUIViewEvent from  "../../GUIViewEvent";

export default class OrientationSelectorDirector extends HTMLElementDirector {
    constructor(rootDomElement) {
        super(orientationSelector(rootDomElement));

        this._element.onchange = () => this.emit(GUIViewEvent.ORIENTATION_PRESET_SELECTED, this._element.value);
    }
    
    set values(orientations) {
        this._element.options.length = 0;
        
        for (let orientation of orientations) {
            this._element.options.add(new Option(orientation, orientation));
        }
    }

    set value(orientation) {
        this._element.value = orientation;
    }
}