import * as dat from "dat.gui";
import EaseController from "./gui/EaseController";

const dom = dat.dom.dom;
export default function addEase(object, property, middleware) {
    const controller = new EaseController(object, property, middleware);

    // Copy of the addRow() l.2149 from dat.gui.js
    const li = document.createElement('li');
    li.appendChild(controller.domElement);
    this.__ul.appendChild(li);
    this.onResize();

    // Partial copy of add() l.2149 from dat.gui.js
    dom.addClass(li, dat.GUI.CLASS_CONTROLLER_ROW);
    dom.addClass(li, 'ease');

    // Partial copy of augmentController() l.922 from dat.gui.js
    controller.__li = li;
    controller.__gui = this;
    controller.name = function (name) {
    this.__li.firstElementChild.firstElementChild.innerHTML = name;
    return this;
    };
    controller.listen = function () {
    this.__gui.listen(this);
    return this;
    };
    controller.remove = function () {
    this.__gui.remove(this);
    return this;
    };

    this.__controllers.push(controller);

    return controller;
}