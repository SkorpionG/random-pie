import { describe, test, expect } from "@jest/globals";
import { accumulate } from "../src/utils";

describe("Utils Functions", () => {
  describe("accumulate()", () => {
    test("應該正確計算累積和", () => {
      expect(accumulate([1, 2, 3])).toEqual([1, 3, 6]);
      expect(accumulate([1])).toEqual([1]);
    });

    test("應該拋出型別錯誤", () => {
      expect(() => accumulate("not an array" as unknown as number[])).toThrow(TypeError);
    });

    test("應該拋出範圍錯誤", () => {
      expect(() => accumulate([])).toThrow(RangeError);
    });
  });
});
