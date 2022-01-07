export default class HTMLElementDirector {
    constructor(htmlElement) {
        this._element = htmlElement;
    }

    on(eventKey, callback) {
        this._element.addEventListener(eventKey, event => callback(...event.detail));
    }

    emit(eventKey, ...args) {
        this._element.dispatchEvent(new CustomEvent(eventKey, { detail: args }));
    }
}