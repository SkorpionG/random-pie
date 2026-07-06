import { test, expect, describe } from "@jest/globals";
import Random from "../src/random";

describe("Random Class", () => {
  test("all static methods should exist", () => {
    expect(typeof Random.rand).toBe("function");
    expect(typeof Random.uniform).toBe("function");
    expect(typeof Random.randInt).toBe("function");
    expect(typeof Random.randRange).toBe("function");
    expect(typeof Random.choice).toBe("function");
    expect(typeof Random.choices).toBe("function");
    expect(typeof Random.shuffled).toBe("function");
    expect(typeof Random.shuffle).toBe("function");
    expect(typeof Random.sample).toBe("function");
  });

  test("should correctly proxy all method calls", () => {
    const arr = [1, 2, 3];
    expect(Random.rand()).toBeGreaterThanOrEqual(0);
    expect(Random.rand()).toBeLessThan(1);
    expect(Random.uniform(1, 2)).toBeGreaterThanOrEqual(1);
    expect(Random.uniform(1, 2)).toBeLessThan(2);
    expect(arr).toContain(Random.choice(arr));
  });

  test("uniform method should handle boundary values", () => {
    const result = Random.uniform(0, 1);
    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThan(1);
  });

  test("randRange method should handle boundary values", () => {
    const result = Random.randRange(0, 1);
    expect(result).toEqual(0);
    expect(result).toBeLessThan(1);
  });

  test("randInt method should respect step argument", () => {
    const result = Random.randInt(0, 10, 2);
    expect(result % 2).toBe(0);
  });

  test("choice method should handle single-element array", () => {
    expect(Random.choice([1])).toBe(1);
  });

  test("choices method should handle single-element array", () => {
    expect(Random.choices([1], { k: 1 })).toEqual([1]);
  });

  test("shuffle method should modify array in place (not return a new array)", () => {
    const arr = [1, 2, 3];
    Random.shuffle(arr);
    expect(arr).toBe(arr);
  });

  test("shuffled method should return a new array", () => {
    const arr = [1, 2, 3];
    const shuffled = Random.shuffled([...arr]);
    expect(shuffled).not.toBe(arr);
  });

  test("sample method should return a new array", () => {
    const arr = [1, 2, 3];
    const sample = Random.sample([...arr], 2);
    expect(sample).not.toBe(arr);
  });
});
