/**
 * Types for the random-pie package
 */

/**
 * Options for the choices function
 */
export interface ChoicesOptions {
  /**
   * An array of weights corresponding to each element in the population
   */
  weights?: number[] | null;

  /**
   * An array of cumulative weights
   */
  cumWeights?: number[] | null;

  /**
   * The number of elements to select
   */
  k?: number;
}
