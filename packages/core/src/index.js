import styles from "./index.scss";
import EaseManager from "./EaseManager";
import addEaseGUI from "./gui/addEaseGUI";
import Middleware from "./middleware/Middleware";
import EaseEntry from "./middleware/EaseEntry";
import Ease, { Curve, Orientation, Handle, Anchor, Point } from "./gui/ease/Ease";
import EaseTemplate from "./gui/ease/EaseTemplate";
import * as templates from "./middleware/easeTemplates";

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

    const add = dat.GUI.prototype.add;
    function addOverride(object, property) {
        const value = object[property] || object;

        if (easeManager.supports(value)) {
            addEase.call(this, ...arguments);
        }
        else {
            add.call(this, ...arguments);
        }
    }

    dat.GUI.prototype.add = addOverride;
    dat.gui.GUI.prototype.add = addOverride;

    dat.GUI.prototype.addEase = addEase;
    dat.gui.GUI.prototype.addEase = addEase;

    return easeManager;
}

export {
    Middleware,
    EaseEntry,
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

export default {
    extend
};