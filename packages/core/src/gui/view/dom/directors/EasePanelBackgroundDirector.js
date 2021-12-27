import HTMLElementDirector from "../../HTMLElementDirector";
import { cornerCurveCanvas } from "../selectors";

export default class EasePanelBackgroundDirector extends HTMLElementDirector {
    constructor(rootDomElement) {
        super();

        this._cornerCurveCanvas = cornerCurveCanvas(rootDomElement);
        this._cornerCurveCanvas.width = this._cornerCurveCanvas.height = 60;

        this._cornerCurveCanvasContext = this._cornerCurveCanvas.getContext("2d");
    }

    refresh(ease) {
        const ctx = this._cornerCurveCanvasContext;
        const { width, height } = this._cornerCurveCanvas;

        ctx.strokeStyle = ctx.fillStyle = "#88CE02";
		ctx.lineWidth = 1;
        ctx.clearRect(0, 0, width, height);
        ctx.beginPath();
		ctx.moveTo(ease.firstAnchor.x * width, (1 - ease.firstAnchor.y) * height);
        
        for (let i = 0; i < ease.anchors.length; i += 2) {
            const startAnchor = ease.anchors[i];
            const endAnchor = ease.anchors[i + 1];

            ctx.bezierCurveTo(
                startAnchor.handle.x * width, (1 - startAnchor.handle.y) * height, 
                endAnchor.handle.x * width, (1 - endAnchor.handle.y) * height, 
                endAnchor.x * width, (1 - endAnchor.y) * height);
        }

        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.stroke();
        ctx.fill();
    }
}