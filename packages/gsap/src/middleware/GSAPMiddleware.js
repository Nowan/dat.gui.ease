import { Middleware } from "dat.gui.ease";

export default class GSAPMiddleware extends Middleware {
    isEditingSupported() {
        return this._caster.isCustomEaseSupported();
    }
}