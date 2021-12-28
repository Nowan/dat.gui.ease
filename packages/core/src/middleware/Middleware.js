import CastMap from "./CastMap";

class Middleware {
    constructor(...castEntries) {
        this._presets = castEntries.map(entry => entry.internal);
        this._castMap = new CastMap(castEntries);

        this.castEntries = castEntries;
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

export function middleware(...castEntries) {
    return new Middleware(...castEntries);
}

export default Middleware;