import { Ease } from "..";
import PresetCastEntry from "./cast/PresetCastEntry";
import TransformCastEntry from "./cast/TransformCastEntry";

class Middleware {
    constructor(name, castEntries = []) {
        this._name = name;
        this._castEntries = castEntries;
        this._thirdPartyEaseClass = null;
        this._thirdPartyEaseBuilderFunction = null;
        this._transforms = [];
    }

    get castEntries() {
        return this._castEntries;
    }

    get presets() {
        return this._castEntries.filter(castEntry => castEntry instanceof PresetCastEntry).map(entry => entry.preset);
    }

    preset(thirdPartyEase, nativeEasePreset) {
        this.castEntries.push(PresetCastEntry.of(thirdPartyEase, nativeEasePreset));
        return this;
    }

    pick(predicateFunction) {
        const middleware = this;
        return {
            transform(thirdPartyToNativeCast, nativeToThirdPartyCast) {
                middleware.castEntries.push(TransformCastEntry.of(predicateFunction, thirdPartyToNativeCast, nativeToThirdPartyCast));
                return middleware;
            }
        }
    }

    transform(thirdPartyToNativeCast, nativeToThirdPartyCast) {
        this.castEntries.push(TransformCastEntry.of(thirdPartyToNativeCast, nativeToThirdPartyCast));
        return this;
    }

    defaultCast(ThirdPartyEaseClass, thirdPartyEaseBuilderFunction) {
        try {
            _checkDefaultCast(ThirdPartyEaseClass, thirdPartyEaseBuilderFunction);

            this._thirdPartyEaseClass = ThirdPartyEaseClass;
            this._thirdPartyEaseBuilderFunction = thirdPartyEaseBuilderFunction;
        }
        catch(e) {
            console.warn(e);
        }

        return this;
    }

    isEditingSupported() {
        return this.castEntries.some(castEntry => castEntry instanceof TransformCastEntry);
    }

    isFormatSupported(thirdPartyEase) {
        return this.castEntries.some(castEntry => castEntry.supportsCastInward(thirdPartyEase));
        // return this._hasDefinedCast(thirdPartyEase) || this._hasDefaultCast(thirdPartyEase);
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

    _hasDefinedCast(thirdPartyEase) {
        return this._castEntries.some(castEntry => castEntry.supportsCastInward(thirdPartyEase));
    }

    _hasDefaultCast(thirdPartyEase) {
        const ThirdPartyEase = this._thirdPartyEaseClass;

        return ThirdPartyEase && thirdPartyEase instanceof ThirdPartyEase;
    }
}

function _checkDefaultCast(ThirdPartyEaseClass, thirdPartyEaseBuilderFunction) {
    try {
        const thirdPartyEase = thirdPartyEaseBuilderFunction(Ease.fromSVGPath("M 0,0 C 0,0 1,1 1,1"));

        if (!(thirdPartyEase instanceof ThirdPartyEaseClass)) {
            throw new Error(`Builder function returns invalid type`)
        }
    }
    catch(e) {
        throw new Error(`Builder function invalid`);
    }
}

export function middleware(name) {
    return new Middleware(name);
}

export default Middleware;