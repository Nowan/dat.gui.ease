export default class EaseCaster {
    constructor() {
        this._castMap = this._createCastMap();
    }

    internalToExternal(internalEase) {
        for (let [externalEase, template] of this._castMap) {
            if (template === internalEase) {
                return externalEase;
            }
        }
    }

    externalToInternal(externalEase) {
        return this._castMap.get(externalEase);
    }
    
    isSupported(externalEase) {
        return this._castMap.has(externalEase);
    }

    get supportedTemplates() {
        return Array.from(this._castMap.values());
    }

    _createCastMap() {
        return new Map();
    }
}