export default class CastMap {
    constructor(entries) {
        this._entries = entries;
        this._entriesHashMap = this._createHashMap(entries, this._createHash);
    }

    hasExternal(externalEase) {
        return this._entries.some(entry => entry.external === externalEase);
    }

    externalToInternal(externalEase) {
        return this._entries.find(entry => entry.external === externalEase).internal;
    }

    internalToExternal(internalEase) {
        return this._entries.find(entry => entry.internal === internalEase).external;
    }

    _createHashMap(entries, hashFunction) {
        const hashMap = {};
       
        entries.forEach((entry, i) => {
            hashMap[hashFunction(entry, i)] = entry;
        });

        return hashMap;
    }

    _createHash(entry) {
        return `${entry.internal.curve}.${entry.internal.orientation}`;
    }
}