import * as templates from "../../middleware/easeTemplates";
import Ease from "../ease/Ease";

const templatesMap = _createTemplatesMap(templates);

export default function interpret(easeString) {
    return templatesMap[easeString] || Ease.fromSVGPath(easeString);
}

function _createTemplatesMap(templates) {
    const templatesMap = {};
    
    for (let template of Object.values(templates)) {
        templatesMap[template.toString()] = template;
    }

    return templatesMap;
}