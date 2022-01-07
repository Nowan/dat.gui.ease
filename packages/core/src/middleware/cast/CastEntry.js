export default class CastEntry {
    supportsCastInward(thirdPartyEase) {
        try {
            return !!this.castInward(thirdPartyEase);
        }
        catch (e) {
            return false;
        }
    }

    supportsCastOutward(nativeEasePreset) {
        try {
            return !!this.castOutward(nativeEasePreset);
        }
        catch (e) {
            return false;
        }
    }

    castInward(thirdPartyEase) {
        throw new Error("Method override missing");
    }

    castOutward(nativeEasePreset) {
        throw new Error("Method override missing");
    }
}