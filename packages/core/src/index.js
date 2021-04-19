import addEase from "./addEase";
import Middleware from "./middleware/Middleware";
import EaseCaster from "./middleware/EaseCaster";
import Ease, { Curve, Orientation, Handle, Anchor, Point } from "./gui/ease/Ease";
import EaseTemplate from "./gui/ease/EaseTemplate";
import * as templates from "./gui/ease/templates";

export default function extend(dat) {
    const middlewares = [];

    dat.GUI.prototype.addEase = function(object, property) {
        const ease = object[property];
        const middleware = middlewares.find(middleware => middleware.isFormatSupported(ease));
    
        if (middleware) {
            return addEase.call(this, object, property, middleware);
        }
        else {
            console.warn("No compatible middleware found.");
        }
    }

    return {
        use(middleware = {}) {
            if (middleware.toString() === "[object EaseMiddleware]") {
                middlewares.push(middleware);
            }
            else {
                console.warn("Middleware instance expected");
            }
        }
    }
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
    templates
}
