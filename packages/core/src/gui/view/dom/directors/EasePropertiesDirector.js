import propertyDomTemplate from "../property.html";
import HTMLElementDirector from "../../HTMLElementDirector";
import { propertiesContainer } from "../selectors";
import { controllers } from "dat.gui";
const { StringController, NumberControllerBox: NumberController, BooleanController } = controllers;

class EasePropertiesDirector extends HTMLElementDirector {
    constructor(rootDomElement) {
        super(propertiesContainer(rootDomElement));
    }

    set values(props) {
        this._element.innerHTML = "";
        
        for (let [propertyName, propertyValue] of props.entries()) {
            const controller = createDatGuiController(propertyName, propertyValue);
            const propertyElement = _renderTemplate(propertyDomTemplate);
            const className = typeof propertyValue;
            
            controller.domElement.classList.add("c", className);
            propertyElement.classList.add(className);
            propertyElement.querySelector("span.property-name").innerHTML = propertyName;
            propertyElement.firstElementChild.append(controller.domElement);

            controller.onChange((arg1, arg2) => console.log(arg1, arg2));

            this._element.append(propertyElement);
        }
    }
}

function createDatGuiController(propertyName, propertyValue) {
    const config = { [propertyName]: propertyValue };

    switch(typeof propertyValue) {
        case "string":
            return new StringController(config, propertyName);
        case "number":
            return new NumberController(config, propertyName);
        case "boolean":
            return new BooleanController(config, propertyName);
    }
}

function _renderTemplate(template) {
    return (new DOMParser()).parseFromString(template, "text/html").body.firstChild;
}

export default EasePropertiesDirector;