import * as dat from "dat.gui";
import GUIController from "./controller/GUIController";
const dom = dat.dom.dom;

export default function addEaseGUI(object, property, middleware) {
    const controller = new GUIController(object, property, middleware);

    // Partial copy of add() method
    // https://github.com/dataarts/dat.gui/blob/40f4fc193e25ee51e7e57dfbbfc3118b3927169f/src/dat/gui/GUI.js#L1152
    _recallSavedValue(this, controller);

    const li = _addRow(this);
    dom.addClass(li, "cr");
    dom.addClass(li, 'ease');
    li.appendChild(controller.domElement);

    _augmentController(this, li, controller);

    this.__controllers.push(controller);

    return controller;
}


const DEFAULT_PRESET_NAME = 'Default';
// Copy of recallSavedValue() method
// https://github.com/dataarts/dat.gui/blob/40f4fc193e25ee51e7e57dfbbfc3118b3927169f/src/dat/gui/GUI.js#L1080
function _recallSavedValue(gui, controller) {
    const root = gui.getRoot();
    const matchedIndex = root.__rememberedObjects.indexOf(controller.object);

    if (matchedIndex !== -1) {
        let controllerMap = root.__rememberedObjectIndecesToControllers[matchedIndex];

        if (controllerMap === undefined) {
            controllerMap = {};
            root.__rememberedObjectIndecesToControllers[matchedIndex] = controllerMap;
        }

        controllerMap[controller.property] = controller;

        if (root.load && root.load.remembered) {
            const presetMap = root.load.remembered;

            let preset;

            if (presetMap[gui.preset]) {
                preset = presetMap[gui.preset];
            } else if (presetMap[DEFAULT_PRESET_NAME]) {
                preset = presetMap[DEFAULT_PRESET_NAME];
            } else {
                return;
            }

            if (preset[matchedIndex] && preset[matchedIndex][controller.property] !== undefined) {
                const value = preset[matchedIndex][controller.property];

                controller.initialValue = value;
                controller.setValue(value);
            }
        }
    }
}

// Partial copy of addRow() method
// https://github.com/dataarts/dat.gui/blob/40f4fc193e25ee51e7e57dfbbfc3118b3927169f/src/dat/gui/GUI.js#L889
function _addRow(gui) {
    const li = document.createElement('li');
    gui.__ul.appendChild(li);
    gui.onResize();
    return li;
}

// Partial copy of augmentController() method
// https://github.com/dataarts/dat.gui/blob/40f4fc193e25ee51e7e57dfbbfc3118b3927169f/src/dat/gui/GUI.js#L922
function _augmentController(gui, li, controller) {
    controller.__li = li;
    controller.__gui = this;

    controller.name = function (name) {
        this.__li.querySelector(".property-name").innerHTML = name;
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

    const setValue = controller.setValue;
    controller.setValue = function setValueOverride(value) {
        setValue.call(controller, ...arguments);
        if (gui.getRoot().__preset_select && controller.isModified()) {
            _markPresetModified(gui.getRoot(), true);
        }
        return value;
    }
}

// Copy of markPresetModified() method
// https://github.com/dataarts/dat.gui/blob/40f4fc193e25ee51e7e57dfbbfc3118b3927169f/src/dat/gui/GUI.js#L912
function _markPresetModified(gui, modified) {
    const opt = gui.__preset_select[gui.__preset_select.selectedIndex];
  
    if (modified) {
      opt.innerHTML = opt.value + '*';
    } else {
      opt.innerHTML = opt.value;
    }
}