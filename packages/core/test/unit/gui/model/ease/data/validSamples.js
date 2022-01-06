import Ease, { Anchor, Point } from "../../../../../../src/gui/model/ease/Ease";

export default new Map([
    ["M 0,0 C 0,0 1,1 1,1", Ease.of(
        Anchor.ofOriginAndHandle(Point.of(0, 0), Point.of(0, 0)),
        Anchor.ofOriginAndHandle(Point.of(1, 1), Point.of(1, 1))
    )],
    ["  M0,0 C0,0 1,1 1,1 ", Ease.of(
        Anchor.ofOriginAndHandle(Point.of(0, 0), Point.of(0, 0)),
        Anchor.ofOriginAndHandle(Point.of(1, 1), Point.of(1, 1))
    )],
    ["M0,0 C0,0 1,1 1,1", Ease.of(
        Anchor.ofOriginAndHandle(Point.of(0, 0), Point.of(0, 0)),
        Anchor.ofOriginAndHandle(Point.of(1, 1), Point.of(1, 1))
    )],
    ["M0,0C0,0,1,1,1,1", Ease.of(
        Anchor.ofOriginAndHandle(Point.of(0, 0), Point.of(0, 0)),
        Anchor.ofOriginAndHandle(Point.of(1, 1), Point.of(1, 1))
    )],
    ["M 0,0 C 0,0,1,1,1,1", Ease.of(
        Anchor.ofOriginAndHandle(Point.of(0, 0), Point.of(0, 0)),
        Anchor.ofOriginAndHandle(Point.of(1, 1), Point.of(1, 1))
    )],
    ["M0.0,0.0C0.0,0.0 1.0,1.0 1.0,1.0", Ease.of(
        Anchor.ofOriginAndHandle(Point.of(0, 0), Point.of(0, 0)),
        Anchor.ofOriginAndHandle(Point.of(1, 1), Point.of(1, 1))
    )],
    ["M 0.0,0.0 C 0.0,0.0 1.0,1.0 1.0,1.0", Ease.of(
        Anchor.ofOriginAndHandle(Point.of(0, 0), Point.of(0, 0)),
        Anchor.ofOriginAndHandle(Point.of(1, 1), Point.of(1, 1))
    )],
    ["M.25,.25C.1,.1,1.,1.,1.,1.", Ease.of(
        Anchor.ofOriginAndHandle(Point.of(0.25, 0.25), Point.of(0.1, 0.1)),
        Anchor.ofOriginAndHandle(Point.of(1, 1), Point.of(1, 1))
    )],
    ["M .25,.25 C .1,.1 1.,1. 1.,1.", Ease.of(
        Anchor.ofOriginAndHandle(Point.of(0.25, 0.25), Point.of(0.1, 0.1)),
        Anchor.ofOriginAndHandle(Point.of(1, 1), Point.of(1, 1))
    )],
    ["M 0,0 C 0,0 0.25,1 0.5,0.5 0.75,0 1,1 1,1", Ease.of(
        Anchor.ofOriginAndHandle(Point.of(0, 0), Point.of(0, 0)),
        Anchor.ofOriginAndHandle(Point.of(0.5, 0.5), Point.of(0.25, 1)),
        Anchor.ofOriginAndHandle(Point.of(0.5, 0.5), Point.of(0.75, 0)),
        Anchor.ofOriginAndHandle(Point.of(1, 1), Point.of(1, 1))
    )]
]);