import Ease, { InvalidSVGPathException } from "../../../../../src/gui/model/ease/Ease.js";
import validSamples from "./data/validSamples";
import invalidSamples from "./data/invalidSamples";

describe("Ease", () => {
    for (let [svgPath, expectedEase] of validSamples.entries()) {
        it(`Parses "${svgPath}"`, () => {
            const ease = Ease.ofSVGPath(svgPath);
            
            expect(ease).toEqual(expectedEase);
        });
    }

    for (let svgPath of invalidSamples) {
        it(`Throws exception on parsing "${svgPath}"`, () => {
            expect(() => Ease.ofSVGPath(svgPath)).toThrow(InvalidSVGPathException);
        });
    }

    it (`Computes value of linear segmented ease`, () => {
        const ease = Ease.ofSVGPath("M 0,0 C 0,0 0,0 0.5,0.5 1,1 1,1 1,1");

        for (let i = 0; i <= 1; i += 0.1) {
            expect(ease.computeValue(i).toFixed(3)).toEqual(i.toFixed(3))
        }
    })
});