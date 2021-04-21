import CastMap from "./CastMap";

export default class Middleware {
    constructor(entries) {
        this._templates = entries.map(entry => entry.internal);
        this._castMap = new CastMap(entries);
    }

    isEditingSupported() {
        // Some frameworks don't allow custom easing curves, this flag is used to disable ease editor in such cases.
        return true;
    }

    isFormatSupported(externalEase) {
        return this._castMap.hasExternal(externalEase);
    }

    import(externalEase) {
        return this._castMap.externalToInternal(externalEase);
    }

    export(internalEase) {
        return this._castMap.internalToExternal(internalEase);
    }

    toString() {
        return `[object ${Middleware.CLASS_NAME}]`;
    }

    get templates() {
        return this._templates;
    }

    static CLASS_NAME = "DatGuiEaseMiddleware";
}