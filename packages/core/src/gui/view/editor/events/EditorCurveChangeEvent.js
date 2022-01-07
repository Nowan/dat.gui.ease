export default class EditorCurveChangeEvent extends CustomEvent {
    constructor() {
        super(EditorCurveChangeEvent.KEY);
    }

    static KEY = "editorCurveChangeEvent";
}