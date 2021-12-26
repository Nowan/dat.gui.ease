class CastEntry {
    constructor(thirdPartyEasePreset, nativeEasePreset) {
        this.external = thirdPartyEasePreset;
        this.internal = nativeEasePreset;
    }
}

export function cast(thirdPartyEasePreset) {
    return {
        to(nativeEasePreset) {
            return new CastEntry(thirdPartyEasePreset, nativeEasePreset);
        }
    };
}

export default CastEntry;