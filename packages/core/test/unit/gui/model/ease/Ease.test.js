import Ease, { InvalidSVGPathException } from "../../../../../src/gui/model/ease/Ease.js";
import validSamples from "./data/validSamples";
import invalidSamples from "./data/invalidSamples";

describe("Ease", () => {
    for (let [svgPath, expectedEase] of validSamples.entries()) {
        it(`Parses "${svgPath}"`, () => {
            const ease = Ease.ofSVGPath(svgPath);
            console.log(svgPath, ease, expectedEase);
            expect(ease).toEqual(expectedEase);
        });
    }

    for (let svgPath of invalidSamples) {
        it(`Throws exception on parsing "${svgPath}"`, () => {
            expect(() => Ease.ofSVGPath(svgPath)).toThrow(InvalidSVGPathException);
        });
    }
});