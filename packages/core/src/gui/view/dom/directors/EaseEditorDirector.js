import Ease from "../../../model/ease/Ease";
import EaseEditor, { EditorCurveChangeEvent } from "../../editor/EaseEditor";
import { GUIViewEvent } from "../../GUIView";
import HTMLElementDirector from "../../HTMLElementDirector";
import { editorAcceptButton, editorCanvas, editorDeclineButton, editorSvgPathCopyButton, editorSvgPathInspector } from "../selectors";

export default class EaseEditorDirector extends HTMLElementDirector {
    constructor(rootDomElement) {
        super(editorCanvas(rootDomElement));
        
        this._editor = new EaseEditor(this._element);
        this._element.addEventListener(EditorCurveChangeEvent.KEY, () => this.emit(GUIViewEvent.EASE_MODIFIED, this._editor.ease));

        this._svgPathInspector = this._initSvgPathInspector(rootDomElement);
        this._copyButton = this._initCopyButton(rootDomElement, this._svgPathInspector);
        this._acceptButton = this._initAcceptButton(rootDomElement);
        this._discardButton = this._initDiscardButton(rootDomElement);
    }

    set ease(ease) {
        this._editor.ease = ease;
        this._svgPathInspector.value = ease.toString();
    }
    
    cleanUp() {
        // Hack to reset event listeners assigned to original canvas by CurveJS & external listeners
        const canvas = this._element
        const canvasClone = canvas.cloneNode(true);

        canvas.parentNode.replaceChild(canvasClone, canvas);
    }

    _initSvgPathInspector(rootDomElement) {
        const inspectorElement = editorSvgPathInspector(rootDomElement);

        inspectorElement.oninput = event => {
            try {
                const ease = Ease.fromSVGPath(inspectorElement.value);

                this._editor.ease = ease;
                this.emit(GUIViewEvent.EASE_MODIFIED, ease);
            }
            catch(e) {
                console.warn(`Couldn't parse SVG path ${inspectorElement.value}`);
            }
        }

        return inspectorElement;
    }

    _initCopyButton(rootDomElement, svgPathInspectorElement) {
        const buttonElement = editorSvgPathCopyButton(rootDomElement);

        buttonElement.onclick = () => {
            svgPathInspectorElement.select();
            document.execCommand("copy");
            console.info(`Copied ${svgPathInspectorElement.value}`);
        };

        return buttonElement;
    }

    _initAcceptButton(rootDomElement) {
        const buttonElement = editorAcceptButton(rootDomElement);

        buttonElement.onclick = () => this.emit(GUIViewEvent.ACCEPT_EASE_EDIT_CLICKED, this._editor.ease);

        return buttonElement;
    }

    _initDiscardButton(rootDomElement) {
        const buttonElement = editorDeclineButton(rootDomElement);

        buttonElement.onclick = () => this.emit(GUIViewEvent.DISCARD_EASE_EDIT_CLICKED);

        return buttonElement;
    }
}