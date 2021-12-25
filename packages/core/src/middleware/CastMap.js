export default class CastMap {
    constructor(entries) {
        this._entries = entries;
    }

    hasExternal(externalEase) {
        return this._entries.some(entry => entry.external === externalEase);
    }

    externalToInternal(externalEase) {
        return this._entries.find(entry => entry.external === externalEase).internal;
    }

    internalToExternal(internalEase) {
        return this._entries.find(entry => entry.internal.toString() === internalEase.toString()).external;
    }
}