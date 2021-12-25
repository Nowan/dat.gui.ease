export default class EaseCast {
    constructor(externalTemplate, internalPreset) {
        this.external = externalTemplate;
        this.internal = internalPreset.clone();
    }

    displayAs(displayName) {
        this.internal.displayName = displayName;
        return this;
    }
}