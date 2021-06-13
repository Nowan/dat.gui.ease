import * as presets from "../editor/presets";
import Ease from "../ease/Ease";

const presetsMap = _createPresetsMap(presets);

export default function interpret(easeString) {
    return presetsMap[easeString] || Ease.fromSVGPath(easeString);
}

function _createPresetsMap(presets) {
    const presetsMap = {};
    
    for (let preset of Object.values(presets)) {
        presetsMap[preset.toString()] = preset;
    }

    return presetsMap;
}