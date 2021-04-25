import CurveJS from "./lib/curvesjs/Curve";
import BezierPoint from "./lib/curvesjs/BezierPoint";
import { EditorCurveChangeEvent } from "./events";
import Ease from "../ease/Ease";

export default class EaseEditor {
  constructor(canvas) {
    this._canvas = canvas;
    this._ctx = this._prepareContext(canvas);
    this._curve = this._createCurveJSInstance(this._ctx);
    this._propagateEvents(this._curve, canvas);
  }

  set ease(ease) {
    const { points, pointColor, pointSize, cpDist } = this._curve;
    const { anchors, firstAnchor, lastAnchor } = ease;
    points.length = 0;

    const firstPoint = new BezierPoint(this._toCanvasX(firstAnchor.x), this._toCanvasY(firstAnchor.y), this._ctx, pointColor, pointSize, cpDist);
    firstPoint.cp2.x = this._toCanvasX(firstAnchor.handle.x);
    firstPoint.cp2.y = this._toCanvasY(firstAnchor.handle.y);
    firstPoint.cp1.x = -firstPoint.cp2.x;
    firstPoint.cp1.y = -firstPoint.cp2.y;
    points.push(firstPoint);

    for (let i = 1; i < anchors.length - 1; i += 2) {
      const precedingCurveEndAnchor = anchors[i];
      const followingCurveStartAnchor = anchors[i + 1];
      const point = new BezierPoint(this._toCanvasX(precedingCurveEndAnchor.x), this._toCanvasY(precedingCurveEndAnchor.y), this._ctx, pointColor, pointSize, cpDist);

      point.cp1.x = this._toCanvasX(precedingCurveEndAnchor.handle.x);
      point.cp1.y = this._toCanvasY(precedingCurveEndAnchor.handle.y);
      point.cp2.x = this._toCanvasX(followingCurveStartAnchor.handle.x);
      point.cp2.y = this._toCanvasY(followingCurveStartAnchor.handle.y);

      points.push(point);
    }

    const lastPoint = new BezierPoint(this._toCanvasX(lastAnchor.x), this._toCanvasY(lastAnchor.y), this._ctx, pointColor, pointSize, cpDist);
    lastPoint.cp1.x = this._toCanvasX(lastAnchor.handle.x);
    lastPoint.cp1.y = this._toCanvasY(lastAnchor.handle.y);
    lastPoint.cp2.x = -lastPoint.cp1.x;
    lastPoint.cp2.y = -lastPoint.cp1.y;
    points.push(lastPoint);

    this._curve.draw();
  }

  get ease() {
    const ease = new Ease();
    const { cw, ch, points } = this._curve;

    for (let i = 0; i < points.length - 1; i++) {
      const startPoint = points[i];
      const startAnchor = ease.addAnchor(this._fromCanvasX(startPoint.position.x), this._fromCanvasY(startPoint.position.y));
      startAnchor.handle.x = this._fromCanvasX(startPoint.cp2.x);
      startAnchor.handle.y = this._fromCanvasY(startPoint.cp2.y);

      const endPoint = points[i + 1];
      const endAnchor = ease.addAnchor(this._fromCanvasX(endPoint.position.x), this._fromCanvasY(endPoint.position.y));
      endAnchor.handle.x = this._fromCanvasX(endPoint.cp1.x);
      endAnchor.handle.y = this._fromCanvasY(endPoint.cp1.y);
    }

    return ease;
  }

  _prepareContext(canvas) {
    const ctx = canvas.getContext("2d");
    ctx.canvas.width = canvas.clientWidth;
    ctx.canvas.height = canvas.clientHeight;
    return ctx;
  }

  _createCurveJSInstance(ctx) {
    const curve = new CurveJS(ctx);

    curve.setPointStyle('#ffffff', 8);
    curve.setLineStyle('#ace247', 2);

    return curve;
  }

  _propagateEvents(curve, canvas) {
    curve.on('drag', () => canvas.dispatchEvent(new EditorCurveChangeEvent()));
    curve.on('newpoint', () => canvas.dispatchEvent(new EditorCurveChangeEvent()));
    curve.on('removepoint', () => canvas.dispatchEvent(new EditorCurveChangeEvent()));
  }

  _toCanvasX(x) {
    return x * this._curve.cw;
  }

  _toCanvasY(y) {
    return (1 - y) * this._curve.ch;
  }

  _fromCanvasX(x) {
    return this._round(x / this._curve.cw);
  }

  _fromCanvasY(y) {
    return this._round(1 - y / this._curve.ch);
  }

  _round(coord, numberOfFloatDigits = 3) {
    const power = Math.pow(10, numberOfFloatDigits);
    return Math.round(coord * power) / power;
  }
}

export {
  EditorCurveChangeEvent
}