import domTemplate from "./dom/gui.html";

export default class GUIView {
    constructor() {
        this._domElement = this._renderTemplate(domTemplate);
    }

    get domElement() {
        return this._domElement;
    }

    _renderTemplate(template) {
        return (new DOMParser()).parseFromString(template, "text/html").body.firstChild;
    }
}