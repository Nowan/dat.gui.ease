import PredicateCastEntry from "./cast/PredicateCastEntry";
import InstanceCastEntry from "./cast/InstanceCastEntry";
import TransformCastEntry from "./cast/TransformCastEntry";

class Middleware {
    constructor(name, castEntries = []) {
        this._name = name;
        this._castEntries = castEntries;
    }

    get castEntries() {
        return this._castEntries;
    }

    get presets() {
        return this._castEntries.filter(castEntry => !(castEntry instanceof TransformCastEntry)).map(entry => entry.preset);
    }

    preset(nativeEasePreset, thirdPartyEaseOrPredicateFunction, ...followupArguments) {
        switch (typeof thirdPartyEaseOrPredicateFunction) {
            case "function":
                this._predicatePreset(nativeEasePreset, thirdPartyEaseOrPredicateFunction, ...followupArguments);
                return this;
            case "string":
            case "object":
                this._instancePreset(nativeEasePreset, thirdPartyEaseOrPredicateFunction);
                return this;
            default:
                console.warn(`Unsupported ease format: `, thirdPartyEaseOrPredicate);
                return this;
        }
    }

    transform(predicateFunction, thirdPartyToNativeCast, nativeToThirdPartyCast) {
        this.castEntries.push(TransformCastEntry.of(predicateFunction, thirdPartyToNativeCast, nativeToThirdPartyCast));
        return this;
    }

    pick(predicateFunction) {
        const middleware = this;

        return {
            transform(thirdPartyToNativeCast, nativeToThirdPartyCast) {
                middleware.castEntries.push(TransformCastEntry.of(predicateFunction, thirdPartyToNativeCast, nativeToThirdPartyCast));
                return middleware;
            }
        };
    }

    isEditingSupported() {
        return this.castEntries.some(castEntry => castEntry instanceof TransformCastEntry);
    }

    isFormatSupported(thirdPartyEase) {
        return this.castEntries.some(castEntry => castEntry.supportsCastInward(thirdPartyEase));
    }

    import(thirdPartyEase) {
        const castEntry = this._castEntries.find(castEntry => castEntry.supportsCastInward(thirdPartyEase));
        
        if (castEntry) {
            return castEntry.castInward(thirdPartyEase);
        }
        else {
            console.warn(`Unsupported inward cast requested for ease ${thirdPartyEase.toString()}`);
        }
    }

    export(nativeEase) {
        const castEntry = this._castEntries.find(castEntry => castEntry.supportsCastOutward(nativeEase));
        
        if (castEntry) {
            return castEntry.castOutward(nativeEase);
        }
        else {
            console.warn(`Unsupported outward cast requested for ease ${nativeEase.toString()}`);
        }
    }

    toString() {
        return `[object DatGuiEase${this._name}Middleware]`;
    }

    static checkSignature(instanceLike) {
        return /^\[object DatGuiEase(?:.*)Middleware\]$/.test(instanceLike.toString());
    }

    _predicatePreset(nativeEasePreset, predicateFunction, thirdPartyToNativeCast, nativeToThirdPartyCast) {
        this.castEntries.push(PredicateCastEntry.of(...arguments));
    }

    _instancePreset(nativeEasePreset, thirdPartyEase) {
        this.castEntries.push(InstanceCastEntry.of(...arguments));
    }
}

export function middleware(name) {
    return new Middleware(name);
}

export default Middleware;