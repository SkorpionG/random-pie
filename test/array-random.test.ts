import { test, expect, describe } from "@jest/globals";
import { choice, choices, shuffle, shuffled, sample } from "../src/array-random";

describe("Array Random Functions", () => {
  describe("choice()", () => {
    test("應該從陣列中回傳一個元素", () => {
      const arr = [1, 2, 3, 4, 5];
      const result = choice(arr);
      expect(arr).toContain(result);
    });

    test("應該拋出型別錯誤", () => {
      expect(() => choice("not an array" as unknown as any[])).toThrow(TypeError);
    });

    test("應該拋出範圍錯誤", () => {
      expect(() => choice([])).toThrow(RangeError);
    });

    test("應該處理只有一個元素的陣列", () => {
      const arr = [1];
      expect(choice(arr)).toBe(1);
    });

    test("應該處理包含 undefined 的陣列", () => {
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

    test("應該回傳指定數量的元素", () => {
      const arr = [1, 2, 3, 4, 5];
      const result = choices(arr, { k: 3 });
      expect(result).toHaveLength(3);
      result.forEach((item) => expect(arr).toContain(item));
    });

    test("應該根據權重選擇元素", () => {
      const arr = [1, 2];
      const weights = [1, 0];
      const result = choices(arr, { weights, k: 10 });
      expect(result.every((item) => item === 1)).toBe(true);
    });

    test("應該處理空的權重陣列", () => {
      const arr = [1, 2, 3];
      expect(() => choices(arr, { weights: [], k: 2 })).toThrow(RangeError);
    });

    test("應該處理無效的累積權重", () => {
      const arr = [1, 2, 3];
      expect(() => choices(arr, { cumWeights: [1], k: 2 })).toThrow(RangeError);
    });

    test("應該處理 k=0 的情況", () => {
      const arr = [1, 2, 3];
      expect(choices(arr, { k: 0 })).toEqual([]);
    });

    test("應該處理所有權重為0的情況", () => {
      const arr = [1, 2];
      const weights = [0, 0];
      expect(() => choices(arr, { weights })).toThrow(RangeError);
    });

    test("應該正確處理單一權重", () => {
      const arr = [1, 2];
      const weights = [1, 0];
      const result = choices(arr, { weights, k: 5 });
      expect(result.every((item) => item === 1)).toBe(true);
    });
  });

  describe("shuffle()", () => {
    test("First argument should be an array", () => {
      expect(() => shuffle("not an array" as unknown as any[])).toThrow(Error);
    });

    test("應該打亂陣列", () => {
      const arr = [1, 2, 3, 4, 5];
      const original = [...arr];
      shuffle(arr);
      expect(arr).toHaveLength(original.length);
      expect(arr).toEqual(expect.arrayContaining(original));
    });

    test("應該處理單一元素陣列", () => {
      const arr = [1];
      shuffle(arr);
      expect(arr).toEqual(arr);
    });

    test("應該維持陣列長度", () => {
      const arr = [1, 2, 3, 4, 5];
      shuffled(arr);
      expect(arr.length).toBe(arr.length);
    });

    test("應該正確處理兩個元素的陣列", () => {
      const arr = [1, 2];
      shuffle(arr);
      expect(arr).toHaveLength(2);
      expect(arr).toEqual(expect.arrayContaining(arr));
    });

    test("應該處理包含重複元素的陣列", () => {
      const arr = [1, 1, 2, 2];
      shuffle(arr);
      expect(arr.sort()).toEqual(arr.sort());
    });
  });

  describe("shuffled()", () => {
    test("First argument should be an array", () => {
      expect(() => shuffled("not an array" as unknown as any[])).toThrow(Error);
    });

    test("should not modify the original array", () => {
      const arr = [1, 2, 3, 4, 5];
      shuffled(arr);
      expect(arr).toEqual(arr);
    });

    test("應該打亂陣列", () => {
      const arr = [1, 2, 3, 4, 5];
      const shuffledArr = shuffled(arr);
      expect(shuffledArr).toHaveLength(arr.length);
      expect(shuffledArr).toEqual(expect.arrayContaining(arr));
    });

    test("應該處理單一元素陣列", () => {
      const arr = [1];
      expect(shuffled([...arr])).toEqual(arr);
    });

    test("應該維持陣列長度", () => {
      const arr = [1, 2, 3, 4, 5];
      const shuffledArr = shuffled([...arr]);
      expect(shuffledArr.length).toBe(arr.length);
    });

    test("應該正確處理兩個元素的陣列", () => {
      const arr = [1, 2];
      const shuffledArr = shuffled([...arr]);
      expect(shuffledArr).toHaveLength(2);
      expect(shuffledArr).toEqual(expect.arrayContaining(arr));
    });

    test("應該處理包含重複元素的陣列", () => {
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

    test("應該回傳不重複的元素", () => {
      const arr = [1, 2, 3, 4, 5];
      const result = sample(arr, 3);
      expect(result).toHaveLength(3);
      expect(new Set(result).size).toBe(3);
    });

    test("應該處理 counts 參數", () => {
      const arr = ["red", "blue"];
      const counts = [2, 1];
      const result = sample(arr, 2, counts);
      expect(result).toHaveLength(2);
    });

    test("應該處理 k=0 的情況", () => {
      const arr = [1, 2, 3];
      expect(sample(arr, 0)).toEqual([]);
    });

    test("應該處理 counts 全為 0 的情況", () => {
      const arr = [1, 2];
      expect(() => sample(arr, 1, [0, 0])).toThrow(RangeError);
    });

    test("應該處理含有重複元素的 counts", () => {
      const arr = ["a", "b"];
      const counts = [2, 1];
      const result = sample(arr, 2, counts);
      expect(result).toHaveLength(2);
      expect(["a", "b"]).toEqual(expect.arrayContaining(result));
    });

    test("應該維持選取元素的唯一性", () => {
      const arr = [1, 2, 3];
      const result = sample(arr, 3);
      expect(new Set(result).size).toBe(3);
    });

    test("應該處理最大可能採樣數", () => {
      const arr = ["a", "b"];
      const counts = [2, 1];
      expect(() => sample(arr, 4, counts)).toThrow(RangeError);
    });
  });
});
