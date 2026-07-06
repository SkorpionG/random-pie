import { test, expect, describe, jest } from "@jest/globals";
import { choice, choices, shuffle, shuffled, sample } from "../src/array-random";

describe("Array Random Functions", () => {
  describe("choice()", () => {
    test("should return a random element from the array", () => {
      const arr = [1, 2, 3, 4, 5];
      const result = choice(arr);
      expect(arr).toContain(result);
    });

    test("should throw TypeError for non-array input", () => {
      expect(() => choice("not an array" as unknown as any[])).toThrow(TypeError);
    });

    test("should throw RangeError for empty array", () => {
      expect(() => choice([])).toThrow(RangeError);
    });

    test("should handle single-element array", () => {
      const arr = [1];
      expect(choice(arr)).toBe(1);
    });

    test("should handle array containing falsy values (undefined, null, false, 0, empty string)", () => {
      const arr = [undefined, null, false, 0, ""];
      const result = choice(arr);
      expect(arr).toContain(result);
    });
  });

  describe("choices()", () => {
    test("First argument should be an array", () => {
      expect(() => choices("not an array" as unknown as any[])).toThrow(TypeError);
    });

    test("First argument should be an empty array", () => {
      expect(() => choices([])).toThrow(RangeError);
    });

    test("k argument should be a non-negative integer", () => {
      const arr = [1, 2, 3, 4, 5];
      expect(() => choices(arr, { k: -1 })).toThrow(TypeError);
    });

    test("Some negative weight", () => {
      const arr = [1, 2, 3, 4, 5];
      expect(() => choices(arr, { k: 2, weights: [1, -1, 1, 2, -1] })).toThrow(RangeError);
    });

    test("cumWeights argument should be an array", () => {
      const arr = [1, 2, 3, 4, 5];
      expect(() => choices(arr, { cumWeights: "not an array" as unknown as number[] })).toThrow(
        TypeError
      );
    });

    test("Weights argument should be an array", () => {
      const arr = [1, 2, 3, 4, 5];
      expect(() => choices(arr, { weights: "not an array" as unknown as number[] })).toThrow(
        TypeError
      );
    });

    test("Provide both weights and cumWeights", () => {
      const arr = [1, 2];
      expect(() => choices(arr, { weights: [1, 2], cumWeights: [1, 2] })).toThrow(TypeError);
    });

    test("should return the specified number of elements", () => {
      const arr = [1, 2, 3, 4, 5];
      const result = choices(arr, { k: 3 });
      expect(result).toHaveLength(3);
      result.forEach((item) => expect(arr).toContain(item));
    });

    test("should select elements proportionally according to weights", () => {
      const arr = [1, 2];
      const weights = [1, 0];
      const result = choices(arr, { weights, k: 10 });
      expect(result.every((item) => item === 1)).toBe(true);
    });

    test("should throw RangeError when weights array length does not match", () => {
      const arr = [1, 2, 3];
      expect(() => choices(arr, { weights: [], k: 2 })).toThrow(RangeError);
    });

    test("should throw RangeError when cumWeights length does not match array length", () => {
      const arr = [1, 2, 3];
      expect(() => choices(arr, { cumWeights: [1], k: 2 })).toThrow(RangeError);
    });

    test("should return empty array when k=0", () => {
      const arr = [1, 2, 3];
      expect(choices(arr, { k: 0 })).toEqual([]);
    });

    test("should throw RangeError when all weights are zero", () => {
      const arr = [1, 2];
      const weights = [0, 0];
      expect(() => choices(arr, { weights })).toThrow(RangeError);
    });

    test("should correctly handle single non-zero weight", () => {
      const arr = [1, 2];
      const weights = [1, 0];
      const result = choices(arr, { weights, k: 5 });
      expect(result.every((item) => item === 1)).toBe(true);
    });
  });

  describe("choices() - cumWeights", () => {
    test("should select elements proportionally using cumWeights", () => {
      const arr = ["a", "b"];
      const cumWeights = [10, 10]; // 100% weight on first element
      const result = choices(arr, { cumWeights, k: 10 });
      expect(result.every((item) => item === "a")).toBe(true);
    });

    test("should throw RangeError for decreasing (non-monotonic) cumWeights", () => {
      const arr = [1, 2, 3];
      expect(() => choices(arr, { cumWeights: [5, 3, 1] })).toThrow(RangeError);
    });

    test("should throw RangeError for cumWeights with a dip in the middle", () => {
      // A partially decreasing sequence is equally invalid
      expect(() => choices([1, 2, 3], { cumWeights: [1, 5, 3] })).toThrow(RangeError);
    });

    test("non-decreasing error message should describe the violation clearly", () => {
      expect(() => choices(["a", "b", "c"], { cumWeights: [10, 5, 8] })).toThrow(/non-decreasing/i);
    });

    test("should throw RangeError for all-zero cumWeights", () => {
      const arr = [1, 2];
      expect(() => choices(arr, { cumWeights: [0, 0] })).toThrow(RangeError);
    });

    test("should throw RangeError when final cumWeight is zero", () => {
      expect(() => choices(["x", "y", "z"], { cumWeights: [0, 0, 0] })).toThrow(RangeError);
    });

    test("should throw RangeError for negative values in cumWeights", () => {
      const arr = [1, 2];
      expect(() => choices(arr, { cumWeights: [-1, 2] })).toThrow(RangeError);
    });

    test("should throw RangeError for cumWeights with any negative value", () => {
      expect(() => choices([1, 2, 3], { cumWeights: [1, -1, 3] })).toThrow(RangeError);
    });

    test("should throw TypeError for non-integer k", () => {
      const arr = [1, 2, 3];
      expect(() => choices(arr, { k: 1.5 })).toThrow(TypeError);
    });

    test("valid equal-step cumWeights should not throw", () => {
      // [10, 20, 30] represents equal weights of 10 each
      expect(() => choices([1, 2, 3], { cumWeights: [10, 20, 30], k: 5 })).not.toThrow();
    });

    test("valid cumWeights with floating-point values should not throw", () => {
      expect(() => choices(["a", "b"], { cumWeights: [0.3, 1.0], k: 10 })).not.toThrow();
    });

    test("all weight on last element: cumWeights [0, 0, 10] should always select last element", () => {
      // [0, 0, 10] is valid — non-decreasing and last value > 0
      const arr = ["a", "b", "c"];
      const result = choices(arr, { cumWeights: [0, 0, 10], k: 20 });
      expect(result.every((item) => item === "c")).toBe(true);
    });

    test("binary search middle-bucket selection: mocked random forces middle element", () => {
      // Math.random() = 0.5, total = 30, rand = 15
      // cumWeights = [10, 20, 30]: rand=15 is in (10, 20] → index 1 → "b"
      const mockRandom = jest.spyOn(Math, "random").mockReturnValue(0.5);
      const result = choices(["a", "b", "c"], { cumWeights: [10, 20, 30], k: 1 });
      expect(result).toEqual(["b"]);
      mockRandom.mockRestore();
    });

    test("should select correct element when rand falls below first cumWeight bucket", () => {
      // Mock Math.random to return 0 so rand = 0 * total = 0, which is < cumWeights[0]
      // This forces the binary search 'right = mid' branch
      const mockRandom = jest.spyOn(Math, "random").mockReturnValue(0);
      const arr = ["first", "second", "third"];
      const cumWeights = [10, 20, 30];
      const result = choices(arr, { cumWeights, k: 5 });
      expect(result.every((item) => item === "first")).toBe(true);
      mockRandom.mockRestore();
    });
  });

  describe("shuffle()", () => {
    test("should throw TypeError for non-array input", () => {
      expect(() => shuffle("not an array" as unknown as any[])).toThrow(Error);
    });

    test("should shuffle the array in place", () => {
      const arr = [1, 2, 3, 4, 5];
      const original = [...arr];
      shuffle(arr);
      expect(arr).toHaveLength(original.length);
      expect(arr).toEqual(expect.arrayContaining(original));
    });

    test("should handle single-element array without error", () => {
      const arr = [1];
      shuffle(arr);
      expect(arr).toEqual(arr);
    });

    test("should preserve array length after shuffling", () => {
      const arr = [1, 2, 3, 4, 5];
      shuffled(arr);
      expect(arr.length).toBe(arr.length);
    });

    test("should handle two-element array correctly", () => {
      const arr = [1, 2];
      shuffle(arr);
      expect(arr).toHaveLength(2);
      expect(arr).toEqual(expect.arrayContaining(arr));
    });

    test("should handle array with duplicate elements", () => {
      const arr = [1, 1, 2, 2];
      shuffle(arr);
      expect(arr.sort()).toEqual(arr.sort());
    });
  });

  describe("shuffled()", () => {
    test("should throw TypeError for non-array input", () => {
      expect(() => shuffled("not an array" as unknown as any[])).toThrow(Error);
    });

    test("should not modify the original array", () => {
      const arr = [1, 2, 3, 4, 5];
      shuffled(arr);
      expect(arr).toEqual(arr);
    });

    test("should return a shuffled array with same elements", () => {
      const arr = [1, 2, 3, 4, 5];
      const shuffledArr = shuffled(arr);
      expect(shuffledArr).toHaveLength(arr.length);
      expect(shuffledArr).toEqual(expect.arrayContaining(arr));
    });

    test("should handle single-element array", () => {
      const arr = [1];
      expect(shuffled([...arr])).toEqual(arr);
    });

    test("should preserve the length of the original array", () => {
      const arr = [1, 2, 3, 4, 5];
      const shuffledArr = shuffled([...arr]);
      expect(shuffledArr.length).toBe(arr.length);
    });

    test("should handle two-element array correctly", () => {
      const arr = [1, 2];
      const shuffledArr = shuffled([...arr]);
      expect(shuffledArr).toHaveLength(2);
      expect(shuffledArr).toEqual(expect.arrayContaining(arr));
    });

    test("should handle array with duplicate elements", () => {
      const arr = [1, 1, 2, 2];
      const shuffledArr = shuffled([...arr]);
      expect(shuffledArr.sort()).toEqual(arr.sort());
    });
  });

  describe("sample()", () => {
    test("First argument should be an array", () => {
      expect(() => sample("not an array" as unknown as any[], 1)).toThrow(TypeError);
    });

    test("k should be an integer", () => {
      expect(() => sample([], "not an integer" as unknown as number)).toThrow(TypeError);
    });

    test("counts should be an array", () => {
      expect(() => sample([1, 2, 3], 1, "not an array" as unknown as number[])).toThrow(TypeError);
    });

    test("counts length should match array length", () => {
      expect(() => sample([1, 2, 3], 1, [1, 2])).toThrow(RangeError);
    });

    test("counts should contain non-negative integers", () => {
      expect(() => sample([1, 2, 3], 1, [-1, 2, 3])).toThrow(TypeError);
    });

    test("should throw RangeError when k exceeds array length (no counts)", () => {
      expect(() => sample([1, 2, 3], 5)).toThrow(RangeError);
    });

    test("should return unique elements", () => {
      const arr = [1, 2, 3, 4, 5];
      const result = sample(arr, 3);
      expect(result).toHaveLength(3);
      expect(new Set(result).size).toBe(3);
    });

    test("should handle counts parameter to expand population", () => {
      const arr = ["red", "blue"];
      const counts = [2, 1];
      const result = sample(arr, 2, counts);
      expect(result).toHaveLength(2);
    });

    test("should return empty array when k=0", () => {
      const arr = [1, 2, 3];
      expect(sample(arr, 0)).toEqual([]);
    });

    test("should throw RangeError when all counts are zero (empty expanded population)", () => {
      const arr = [1, 2];
      expect(() => sample(arr, 1, [0, 0])).toThrow(RangeError);
    });

    test("should respect counts when selecting unique elements", () => {
      const arr = ["a", "b"];
      const counts = [2, 1];
      const result = sample(arr, 2, counts);
      expect(result).toHaveLength(2);
      expect(["a", "b"]).toEqual(expect.arrayContaining(result));
    });

    test("should maintain uniqueness of selected elements", () => {
      const arr = [1, 2, 3];
      const result = sample(arr, 3);
      expect(new Set(result).size).toBe(3);
    });

    test("should throw RangeError when k exceeds total population size (with counts)", () => {
      const arr = ["a", "b"];
      const counts = [2, 1];
      expect(() => sample(arr, 4, counts)).toThrow(RangeError);
    });
    test("should allow k > arr.length when counts expands the population sufficiently", () => {
      // arr has length 2, counts expands to 4 elements, so k=3 should be valid
      const arr = ["a", "b"];
      const counts = [2, 2];
      const result = sample(arr, 3, counts);
      expect(result).toHaveLength(3);
      result.forEach((item) => expect(["a", "b"]).toContain(item));
    });

    test("k equal to expanded population size should succeed", () => {
      // arr has 2 elements, counts expands to exactly 4 — k=4 should succeed
      const result = sample(["x", "y"], 4, [2, 2]);
      expect(result).toHaveLength(4);
    });

    test("k much larger than arr.length is valid when counts provides enough elements", () => {
      // arr has 1 element but counts makes population of 10 — k=8 is valid
      const result = sample(["only"], 8, [10]);
      expect(result).toHaveLength(8);
      expect(result.every((item) => item === "only")).toBe(true);
    });

    test("result elements should all belong to the original array when using counts", () => {
      const arr = ["red", "blue", "green"];
      const counts = [3, 2, 1]; // expanded: [red,red,red, blue,blue, green]
      const result = sample(arr, 5, counts);
      expect(result).toHaveLength(5);
      result.forEach((item) => expect(arr).toContain(item));
    });

    test("expanded pool uniqueness: counts=[2,1] with k=3 yields exactly 2 'a' and 1 'b'", () => {
      // arr=["a","b"], counts=[2,1] → pool=["a","a","b"], sampling all 3
      const result = sample(["a", "b"], 3, [2, 1]);
      expect(result).toHaveLength(3);
      expect(result.filter((x) => x === "a")).toHaveLength(2);
      expect(result.filter((x) => x === "b")).toHaveLength(1);
    });

    test("k > arr.length without counts should still throw RangeError", () => {
      expect(() => sample([1, 2, 3], 5)).toThrow(RangeError);
      expect(() => sample([1, 2, 3], 5)).toThrow(/k cannot be larger than array length/);
    });

    test("k > expanded population (even with counts) should throw RangeError", () => {
      // arr=["a","b"], counts=[1,1] → expanded=["a","b"], k=3 > 2 → invalid
      expect(() => sample(["a", "b"], 3, [1, 1])).toThrow(RangeError);
      expect(() => sample(["a", "b"], 3, [1, 1])).toThrow(
        /k cannot be larger than population size/
      );
    });

    test("counts that zero out some elements should exclude them from the result", () => {
      // counts=[0, 5] means only "b" is in the pool; k=3 draws only from "b"
      const result = sample(["a", "b"], 3, [0, 5]);
      expect(result).toHaveLength(3);
      expect(result.every((item) => item === "b")).toBe(true);
    });
  });
});
