import styles from "./index.scss";
import EaseManager from "./EaseManager";
import addEaseGUI from "./gui/addEaseGUI";
import Middleware from "./middleware/Middleware";
import EaseCaster from "./middleware/EaseCaster";
import Ease, { Curve, Orientation, Handle, Anchor, Point } from "./gui/ease/Ease";
import EaseTemplate from "./gui/ease/EaseTemplate";
import * as templates from "./gui/ease/templates";

const easeManager = new EaseManager();

function addEase(object, property) {
    const ease = object[property];
        
    if (easeManager.supports(ease)) {
        return addEaseGUI.call(this, object, property, easeManager.getCompatibleMiddleware(ease));
    }
    else {
        console.warn("No compatible middleware found.");
    }
}

export function extend(dat) {
    dat.gui.ease = easeManager;
    dat.GUI.prototype.addEase = addEase;
    dat.gui.GUI.prototype.addEase = addEase;

    return easeManager;
}

export {
    Middleware,
    EaseCaster,
    Ease,
    EaseTemplate,
    Curve,
    Orientation,
    Handle,
    Anchor,
    Point,
    templates,
    easeManager as manager
}

export default extend;