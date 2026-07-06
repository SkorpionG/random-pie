import { describe, test, expect } from "@jest/globals";
import { accumulate } from "../src/utils";

describe("Utils Functions", () => {
  describe("accumulate()", () => {
    test("should correctly calculate cumulative sum", () => {
      expect(accumulate([1, 2, 3])).toEqual([1, 3, 6]);
      expect(accumulate([1])).toEqual([1]);
    });

    test("should throw TypeError for non-array input", () => {
      expect(() => accumulate("not an array" as unknown as number[])).toThrow(TypeError);
    });

    test("should throw RangeError for empty array", () => {
      expect(() => accumulate([])).toThrow(RangeError);
    });
  });
});
