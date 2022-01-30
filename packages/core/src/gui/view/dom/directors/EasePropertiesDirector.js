import propertyDomTemplate from "../property.html";
import HTMLElementDirector from "../../HTMLElementDirector";
import { propertiesContainer } from "../selectors";
import { controllers } from "dat.gui";
import GUIViewEvent from "../../GUIViewEvent";
const { StringController, NumberControllerBox, NumberControllerSlider, BooleanController } = controllers;

class EasePropertiesDirector extends HTMLElementDirector {
    constructor(rootDomElement) {
        super(propertiesContainer(rootDomElement));

        this._values = {};
    }

    set values(props) {
        if (this._values === props) return;
        this._element.innerHTML = "";

        for (let [propertyName, property] of props.entries()) {
            const controller = createDatGuiController(property);
            controller.onChange(value => this.emit(GUIViewEvent.PROPERTY_MODIFIED, propertyName, value));

            this._element.append(controller.domElement);
        }

        this._values = props;
    }
}

function createDatGuiController(property) {
    const config = { [property.name]: property.value };

    switch(typeof property.value) {
        case "string":
            return createStringController(config, property);
        case "number":
            return createNumberController(config, property);
        case "boolean":
            return createBooleanController(config, property);
    }
}

function createStringController(config, property) {
    return extendControllerDOM(new StringController(config, property.name));
}

function createNumberController(config, property) {
    if (property.uiConfig) {
        return createNumberSliderController(config, property);
    }
    else {
        return createNumberBoxController(config, property);
    }
}

// https://github.com/dataarts/dat.gui/blob/f720c729deca5d5c79da8464f8a05500d38b140c/src/dat/gui/GUI.js#L992
function createNumberSliderController(config, property) {
    const sliderController = new NumberControllerSlider(config, property.name, property.uiConfig.min, property.uiConfig.max, property.uiConfig.step);
    const boxController = new NumberControllerBox(config, property.name, property.uiConfig.min, property.uiConfig.max, property.uiConfig.step);
    const wrapperElement = _renderTemplate(propertyDomTemplate);
    
    ['updateDisplay', 'onChange', 'onFinishChange', 'step', 'min', 'max'].forEach(method => {
        const pc = sliderController[method];
        const pb = boxController[method];

        sliderController[method] = boxController[method] = function() {
            const args = Array.prototype.slice.call(arguments);
            pb.apply(boxController, args);
            return pc.apply(sliderController, args);
        };
    });

    wrapperElement.classList.add("number", "has-slider");
    wrapperElement.querySelector("span.property-name").innerHTML = property.name;
    wrapperElement.querySelector("div.c").append(sliderController.domElement, boxController.domElement);

    sliderController.domElement = wrapperElement;
    return sliderController;
}

function createNumberBoxController(config, property) {
    return extendControllerDOM(new NumberControllerBox(config, property.name));
}

function createBooleanController(config, property) {
    return extendControllerDOM(new BooleanController(config, property.name));
}

function extendControllerDOM(controller) {
    const controllerElement = controller.domElement;
    const wrapperElement = _renderTemplate(propertyDomTemplate);

    wrapperElement.classList.add(typeof controller.object[controller.property]);
    wrapperElement.querySelector("span.property-name").innerHTML = controller.property;
    wrapperElement.querySelector("div.c").append(controllerElement.firstElementChild);

    controller.domElement = wrapperElement;
    return controller;
}

function _renderTemplate(template) {
    return (new DOMParser()).parseFromString(template, "text/html").body.firstChild;
}

export default EasePropertiesDirector;