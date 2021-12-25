import styles from "./index.scss";
import EaseManager from "./EaseManager";
import addEaseGUI from "./gui/addEaseGUI";
import Middleware from "./middleware/Middleware";
import CastEntry from "./middleware/CastEntry";
import Ease, { Handle, Anchor, Point } from "./gui/model/ease/Ease";
import EasePreset from "./gui/model/preset/EasePreset";
import * as presets from "./gui/model/preset/presets";

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
            return addEase.call(this, ...arguments);
        }
        else {
            return add.call(this, ...arguments);
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
    CastEntry,
    Ease,
    EasePreset,
    Handle,
    Anchor,
    Point,
    presets,
    easeManager as manager
}

export default {
    extend
};