export default class EaseEntry {
    constructor(externalTemplate, internalTemplate) {
        this.external = externalTemplate;
        this.internal = internalTemplate.clone();
    }

    displayAs(displayName) {
        this.internal.displayName = displayName;
        return this;
    }
}