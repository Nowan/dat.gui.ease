import EaseProperty from "./EaseProperty";

export default class EaseProperties extends Map {
    constructor(ease) {
        super();
        
        this._ease = ease;
    }

    add(propertyName, defaultValue, mutationFunction, uiConfig) {
        this.set(propertyName, new EaseProperty(propertyName, defaultValue, mutationFunction, uiConfig));
    }

    getValue(propertyName) {
        return this.has(propertyName) ? this.get(propertyName).value : undefined;
    }

    setValue(propertyName, value) {
        if (this.has(propertyName)) {
            this.get(propertyName).value = value;
        }
    }
}