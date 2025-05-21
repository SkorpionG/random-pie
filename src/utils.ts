/**
 * Calculates the cumulative sum of an array
 * @param arr The input array of numbers
 * @returns An array of cumulative sums
 * @throws TypeError if the argument is not an array
 * @throws RangeError if the input array is empty
 */
function accumulate(arr: number[]): number[] {
  if (!Array.isArray(arr)) {
    throw new TypeError("Argument must be an array");
  }
  if (arr.length === 0) {
    throw new RangeError("Input array cannot be empty");
  }

  return arr.reduce((acc: number[], curr: number) => {
    const nextSum = (acc.length > 0 ? acc[acc.length - 1] : 0) + curr;
    acc.push(nextSum);
    return acc;
  }, []);
}

export { accumulate };
