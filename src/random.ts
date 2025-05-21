import { rand, uniform, randInt, randRange } from "./number-random";
import { choice, choices, shuffle, shuffled, sample } from "./array-random";
import { ChoicesOptions } from "./types";

/**
 * A class providing static methods for random operations
 */
class Random {
  /**
   * Generates a random floating-point number between 0 (inclusive) and 1 (exclusive).
   * @returns A random floating-point number between 0 and 1
   */
  static rand(): number {
    return rand();
  }

  /**
   * Generates a random floating-point number within a given range.
   * @param min The minimum value of the range
   * @param max The maximum value of the range
   * @returns A random floating-point number between min and max
   */
  static uniform(min: number, max: number): number {
    return uniform(min, max);
  }

  /**
   * Generates a random integer from the specified range.
   * @param args Range parameters (start, stop, step)
   * @returns A random integer within the specified range
   */
  static randInt(...args: number[]): number {
    return randInt(...args);
  }

  /**
   * Generates a random number from the given range.
   * @param args Range parameters (start, stop, step)
   * @returns The random number
   */
  static randRange(...args: number[]): number {
    return randRange(...args);
  }

  /**
   * Return a random element from the given array.
   * @param arr The input array
   * @returns An element from the given array
   */
  static choice<T>(arr: T[]): T {
    return choice(arr);
  }

  /**
   * Return a list of randomly selected elements from the given array.
   * @param arr The input array
   * @param options Configuration options for selection
   * @returns An array containing k randomly selected elements
   */
  static choices<T>(arr: T[], options?: ChoicesOptions): T[] {
    return choices(arr, options);
  }

  /**
   * Shuffles the given array in place.
   * @param arr The input array
   */
  static shuffle<T>(arr: T[]): void {
    shuffle(arr);
  }

  /**
   * Returns a shuffled copy of the given array.
   * @param arr The input array
   * @returns A new array with the same elements, in a random order
   */
  static shuffled<T>(arr: T[]): T[] {
    return shuffled(arr);
  }

  /**
   * Returns k unique elements chosen from the population sequence.
   * @param arr The population sequence
   * @param k The number of elements to choose
   * @param counts The weights for each element in the population
   * @returns A list of k unique elements from the population
   */
  static sample<T>(arr: T[], k: number, counts?: number[] | null): T[] {
    return sample(arr, k, counts);
  }
}

export default Random;
