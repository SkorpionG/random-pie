import { test, expect, describe, jest } from "@jest/globals";
import { rand, uniform, randInt, randRange } from "../src/number-random";

describe("Number Random Functions", () => {
  describe("rand()", () => {
    test("should return a number between 0 (inclusive) and 1 (exclusive)", () => {
      const result = rand();
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThan(1);
    });
  });

  describe("uniform()", () => {
    test("should return a number within the specified range", () => {
      const result = uniform(1, 10);
      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThan(10);
    });

    test("should throw TypeError if min or max is not a number", () => {
      expect(() => uniform("1" as unknown as number, 10)).toThrow(TypeError);
      expect(() => uniform(1, "10" as unknown as number)).toThrow(TypeError);
    });

    test("should throw RangeError if max is not greater than min", () => {
      expect(() => uniform(10, 1)).toThrow(RangeError);
      expect(() => uniform(5, 5)).toThrow(RangeError);
    });

    test("upper bound should be exclusive (result must be strictly less than max)", () => {
      // Run many iterations - result should never equal max
      for (let i = 0; i < 1000; i++) {
        expect(uniform(0, 1)).toBeLessThan(1);
      }
    });

    test("result should always be >= min across many iterations", () => {
      for (let i = 0; i < 500; i++) {
        expect(uniform(3, 7)).toBeGreaterThanOrEqual(3);
        expect(uniform(-10, -1)).toBeGreaterThanOrEqual(-10);
      }
    });

    test("result should always be < max across multiple ranges", () => {
      for (let i = 0; i < 500; i++) {
        expect(uniform(5, 10)).toBeLessThan(10);
        expect(uniform(-10, -1)).toBeLessThan(-1);
      }
    });

    test("equal min and max should throw RangeError (zero-width range)", () => {
      expect(() => uniform(5, 5)).toThrow(RangeError);
      expect(() => uniform(0, 0)).toThrow(RangeError);
    });
  });

  describe("randInt()", () => {
    test("should return 0 when start equals stop", () => {
      expect(randInt(0, 0)).toBe(0);
    });

    test("should return an integer within the specified range (inclusive)", () => {
      const result = randInt(1, 10);
      expect(Number.isInteger(result)).toBe(true);
      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThanOrEqual(10);
    });

    test("should handle single argument (0 to n inclusive)", () => {
      const result = randInt(5);
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThanOrEqual(5);
    });

    test("should handle negative range", () => {
      const result = randInt(-5, -1);
      expect(result).toBeGreaterThanOrEqual(-5);
      expect(result).toBeLessThanOrEqual(-1);
    });

    test("should respect step argument", () => {
      const result = randInt(0, 10, 2);
      expect(result % 2).toBe(0);
    });

    test("should respect negative step with a descending range", () => {
      const result = randInt(10, 0, -2);
      expect(result % 2).toBe(0);
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThanOrEqual(10);
    });

    test("should always return a finite number, never undefined (all 3 calling conventions)", () => {
      // Ensures the TS2322 fix (.at() returning number|undefined) holds at runtime
      for (let i = 0; i < 100; i++) {
        const r1 = randInt(10);
        const r2 = randInt(1, 20);
        const r3 = randInt(0, 10, 2);
        [r1, r2, r3].forEach((r) => {
          expect(r).not.toBeUndefined();
          expect(typeof r).toBe("number");
          expect(Number.isFinite(r)).toBe(true);
        });
      }
    });

    test("should include stop value (inclusive upper bound), verified with mock", () => {
      // Mocking Math.random() near 1 forces the 'return numberRange.stop' branch
      const mockRandom = jest.spyOn(Math, "random").mockReturnValue(0.9999999);
      const result = randInt(1, 5);
      expect(result).toBeLessThanOrEqual(5);
      expect(Number.isInteger(result)).toBe(true);
      mockRandom.mockRestore();
    });

    test("should include the start value (inclusive lower bound), verified with mock", () => {
      const mockRandom = jest.spyOn(Math, "random").mockReturnValue(0);
      const result = randInt(3, 10);
      expect(result).toBe(3);
      mockRandom.mockRestore();
    });

    test("zero-length range should return 0 for both (n,n) and (0,0)", () => {
      expect(randInt(5, 5)).toBe(0);
      expect(randInt(0, 0)).toBe(0);
    });
  });

  describe("randRange()", () => {
    test("should return a number within the specified range [0, n)", () => {
      const result = randRange(10);
      expect(Number.isInteger(result)).toBe(true);
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThan(10);
    });

    test("should return 0 for an empty range", () => {
      expect(randRange(0, 0)).toBe(0);
    });

    test("should handle single negative argument (n to 0)", () => {
      const result = randRange(-5);
      expect(result).toBeGreaterThan(-5);
      expect(result).toBeLessThanOrEqual(0);
    });

    test("should handle two-argument negative range", () => {
      const result = randRange(-10, -1);
      expect(Number.isInteger(result)).toBe(true);
      expect(result).toBeGreaterThanOrEqual(-10);
      expect(result).toBeLessThan(-1);
    });

    test("should handle step argument", () => {
      for (let i = 0; i < 50; i++) {
        const result = randRange(0, 10, 2);
        expect(result % 2).toBe(0);
        expect(result).toBeGreaterThanOrEqual(0);
        expect(result).toBeLessThan(10);
      }
    });

    test("should always return a finite number, never undefined (all 3 calling conventions)", () => {
      // Ensures the TS2322 fix (.at() returning number|undefined) holds at runtime
      for (let i = 0; i < 100; i++) {
        const r1 = randRange(10);
        const r2 = randRange(1, 20);
        const r3 = randRange(0, 10, 3);
        [r1, r2, r3].forEach((r) => {
          expect(r).not.toBeUndefined();
          expect(typeof r).toBe("number");
          expect(Number.isFinite(r)).toBe(true);
        });
      }
    });

    test("stop value should never appear in results (exclusive upper bound)", () => {
      const seen = new Set<number>();
      for (let i = 0; i < 500; i++) {
        seen.add(randRange(0, 5));
      }
      expect(seen.has(5)).toBe(false);
      expect([...seen].every((n) => n >= 0 && n < 5)).toBe(true);
    });

    test("zero-length range should return 0 for both (n,n) and (n,n,step)", () => {
      expect(randRange(5, 5)).toBe(0);
      expect(randRange(0, 0)).toBe(0);
      expect(randRange(0, 0, 2)).toBe(0);
    });
  });
});
