export default class EasePresetProps extends Map {
    constructor(preset) {
        super();
        
        this._preset = preset;
        this._watchers = new Map();
    }

    add(propertyName, defaultValue, watcherFn) {
        this.set(propertyName, defaultValue);

        if (typeof watchFn === "function") {
            this._watchers.set(propertyName, watcherFn);
        }
    }

    set(propertyName, value) {
        super.set(propertyName, value);

        if (this._watchers.has(propertyName)) {
            const watcherFn = this._watchers.get(propertyName);

            watcherFn(value, this._preset);
        }
    }
}