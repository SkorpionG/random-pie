import { test, expect, describe } from "@jest/globals";
import { rand, uniform, randInt, randRange } from "../src/number-random";

describe("Number Random Functions", () => {
  describe("rand()", () => {
    test("應該回傳 0 到 1 之間的數字", () => {
      const result = rand();
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThan(1);
    });
  });

  describe("uniform()", () => {
    test("應該回傳指定範圍內的數字", () => {
      const result = uniform(1, 10);
      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThan(10);
    });

    test("應該拋出型別錯誤", () => {
      expect(() => uniform("1" as unknown as number, 10)).toThrow(TypeError);
      expect(() => uniform(1, "10" as unknown as number)).toThrow(TypeError);
    });

    test("應該拋出範圍錯誤", () => {
      expect(() => uniform(10, 1)).toThrow(RangeError);
    });
  });

  describe("randInt()", () => {
    test("Range should be 0", () => {
      expect(randInt(0, 0)).toBe(0);
    });

    test("應該回傳指定範圍內的整數", () => {
      const result = randInt(1, 10);
      expect(Number.isInteger(result)).toBe(true);
      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThanOrEqual(10);
    });

    test("應該處理單一參數情況", () => {
      const result = randInt(5);
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThanOrEqual(5);
    });

    test("應該處理負數範圍", () => {
      const result = randInt(-5, -1);
      expect(result).toBeGreaterThanOrEqual(-5);
      expect(result).toBeLessThanOrEqual(-1);
    });

    test("應該處理步進值", () => {
      const result = randInt(0, 10, 2);
      expect(result % 2).toBe(0);
    });
  });

  describe("randRange()", () => {
    test("應該回傳指定範圍內的數字", () => {
      const result = randRange(10);
      expect(Number.isInteger(result)).toBe(true);
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThan(10);
    });

    test("應該處理空範圍", () => {
      expect(randRange(0, 0)).toBe(0);
    });

    test("應該處理負數範圍", () => {
      const result = randRange(-5);
      expect(result).toBeGreaterThan(-5);
      expect(result).toBeLessThanOrEqual(0);
    });
  });
});
