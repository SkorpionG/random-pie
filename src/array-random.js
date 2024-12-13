const { accumulate } = require("./utils");

/**
 * Return a random element from the given array.
 *
 * @param {Array} arr The input array
 * @throws TypeError if the given argument is not an array
 * @throws RangeError if the given array is empty
 * @returns {*} An element from the given array
 */
function choice(arr) {
  if (!Array.isArray(arr)) {
    throw new TypeError("Argument must be an array");
  }
  if (arr.length === 0) {
    throw new RangeError("Input array cannot be empty");
  }
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Return a list of randomly selected elements from the given array.
 *
 * @param {Array} arr The input array
 * @param {Object} [options] Configuration options for selection
 * @param {Array} [options.weights=null] An array of weights corresponding to each element in arr
 * @param {Array} [options.cumWeights=null] An array of cumulative weights
 * @param {number} [options.k=1] The number of elements to select
 * @throws TypeError if the first argument is not an array
 * @throws RangeError if the array is empty
 * @throws TypeError if k is not a non-negative integer
 * @throws TypeError if weights or cumWeights are not arrays
 * @throws RangeError if weights or cumWeights length does not match array length
 * @throws RangeError if weights contain negative values
 * @throws RangeError if weights contain only zeros
 * @returns {Array} An array containing k randomly selected elements
 */
function choices(arr, { weights = null, cumWeights = null, k = 1 } = {}) {
  if (!Array.isArray(arr)) {
    throw new TypeError("First argument must be an array");
  }
  if (arr.length === 0) {
    throw new RangeError("Population cannot be empty");
  }
  if (!Number.isInteger(k) || k < 0) {
    throw new TypeError("k must be a non-negative integer");
  }

  if (weights && !Array.isArray(weights)) {
    throw new TypeError("weights must be an array");
  }
  if (weights && weights.length !== arr.length) {
    throw new RangeError("weights length must match array length");
  }
  if (weights?.some((w) => w < 0)) {
    throw new RangeError("weights must be non-negative");
  } else if (weights?.every((w) => w === 0)) {
    throw new RangeError("weights must contain at least one non-zero value");
  }

  if (cumWeights && !Array.isArray(cumWeights)) {
    throw new TypeError("cumWeights must be an array");
  }
  if (cumWeights && cumWeights.length !== arr.length) {
    throw new RangeError("cumWeights length must match array length");
  }

  if (weights && cumWeights) {
    throw new TypeError("Cannot specify both weights and cumWeights");
  }

  const totalWeights = cumWeights || (weights ? accumulate(weights) : null);
  const total = totalWeights
    ? totalWeights[totalWeights.length - 1]
    : arr.length;

  const result = [];
  for (let i = 0; i < k; i++) {
    const rand = Math.random() * total;

    if (!totalWeights) {
      result.push(arr[Math.floor(rand)]);
      continue;
    }

    let left = 0;
    let right = totalWeights.length - 1;

    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (totalWeights[mid] <= rand) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }
    result.push(arr[left]);
  }

  return result;
}

/**
 * Shuffles the given array in place.
 *
 * @param {Array} arr The input array
 * @throws TypeError if the given argument is not an array
 */
function shuffle(arr) {
  if (!Array.isArray(arr)) {
    throw new TypeError("Input must be an array");
  }

  const length = arr.length;

  for (let i = length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

/**
 * Returns a shuffled copy of the given array.
 *
 * @param {Array} arr The input array
 * @throws TypeError if the given argument is not an array
 * @returns {Array} A new array with the same elements, in a random order
 */
function shuffled(arr) {
  if (!Array.isArray(arr)) {
    throw new TypeError("Input must be an array");
  }
  const arrCopy = [...arr];
  shuffle(arrCopy);
  return arrCopy;
}

/**
 * Returns k unique elements chosen from the population sequence. If k is larger than
 * the population size, raise a RangeError. If counts is given, elements from the
 * population are selected according to the given weights. If the relative weights are
 * not specified, the selections are made with equal probability.
 *
 * @param {Array} arr The population sequence
 * @param {number} k The number of elements to choose
 * @param {Array<number>=} counts The weights for each element in the population
 * @throws TypeError if the given arguments are invalid
 * @throws RangeError if k is larger than the population size
 * @returns {Array} A list of k unique elements from the population
 */
function sample(arr, k, counts = null) {
  if (!Array.isArray(arr)) {
    throw new TypeError("First argument must be an array");
  }
  if (!Number.isInteger(k) || k < 0) {
    throw new TypeError("k must be a non-negative integer");
  }
  if (k > arr.length) {
    throw new RangeError("k cannot be larger than array length");
  }
  if (counts !== null) {
    if (!Array.isArray(counts)) {
      throw new TypeError("counts must be an array");
    }
    if (counts.length !== arr.length) {
      throw new RangeError("counts length must match array length");
    }
    if (!counts.every((n) => Number.isInteger(n) && n >= 0)) {
      throw new TypeError("counts must contain non-negative integers");
    }
  }

  const expandedArr = counts
    ? arr.flatMap((item, index) => Array(counts[index]).fill(item))
    : arr;

  if (k > expandedArr.length) {
    throw new RangeError("k cannot be larger than population size");
  }

  const pool = [...expandedArr];
  const result = [];
  for (let i = 0; i < k; i++) {
    const j = Math.floor(Math.random() * (pool.length - i));
    [pool[j], pool[pool.length - 1 - i]] = [pool[pool.length - 1 - i], pool[j]];
    result.push(pool[pool.length - 1 - i]);
  }

  return result;
}

module.exports = {
  choice,
  choices,
  shuffle,
  shuffled,
  sample,
};
