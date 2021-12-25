import CastMap from "./CastMap";

export default class Middleware {
    constructor(...entries) {
        this._presets = entries.map(entry => entry.internal);
        this._castMap = new CastMap(entries);
    }

    isEditingSupported() {
        // Some frameworks don't allow custom easing curves, this flag is used to disable ease editor in such cases.
        return true;
    }

    isFormatSupported(externalPreset) {
        return !!externalPreset && this._castMap.hasExternal(externalPreset);
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

    get presets() {
        return this._presets;
    }

    static CLASS_NAME = "DatGuiEaseMiddleware";
}