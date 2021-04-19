export default class Middleware {
    constructor(easeCaster) {
        this._caster = easeCaster;
    }

    isEditingSupported() {
        return true;
    }

    isFormatSupported(externalEase) {
        return this._caster.isSupported(externalEase);
    }

    import(externalEase) {
        return this._caster.externalToInternal(externalEase);
    }

    export(internalEase) {
        return this._caster.internalToExternal(internalEase);
    }

    toString() {
        return "[object EaseMiddleware]";
    }

    get templates() {
        return this._caster.supportedTemplates;
    }
}