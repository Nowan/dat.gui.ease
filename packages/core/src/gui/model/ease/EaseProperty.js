class EaseProperty {
    constructor(name, value, mutationFunction, uiConfig) {
        this._name = name;
        this._value = value;
        this._mutationFunction = mutationFunction;
        this._uiConfig = uiConfig;
    }

    get name() {
        return this._name;
    }

    get value() {
        return this._value;
    }

    set value(value) {
        this._value = value;
    }

    get mutation() {
        return this._mutationFunction;
    }

    get uiConfig() {
        return this._uiConfig;
    }

    mutate(ease, value = this._value) {
        if (this._mutationFunction) {
            this._mutationFunction(ease, value);
        }
    }
}

export default EaseProperty;