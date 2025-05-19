const { PyRange } = require("range-pie");

/**
 * Generates a random floating-point number between 0 (inclusive) and 1 (exclusive). It is equivalent to Math.random().
 * @returns {number} A random floating-point number between 0 and 1
 */
function rand() {
  return Math.random();
}

/**
 * Generates a random floating-point number within a given range. The range is inclusive, meaning both min and max are included (min <= number <= max).
 * @param {number} min The minimum value of the range
 * @param {number} max The maximum value of the range
 * @throws {TypeError} If min or max is not a number
 * @throws {RangeError} If max is less than or equal to min
 * @returns {number} A random floating-point number between min and max
 */
function uniform(min, max) {
  if (typeof min !== "number" || typeof max !== "number") {
    throw new TypeError("Both min and max must be a number");
  }
  if (max <= min) {
    throw new RangeError("Upper bound must be greater than lower bound");
  }
  return Math.random() * (max - min) + min;
}

/**
 * Generates a random integer from the specified range such that start <= number <= stop. If only one argument is provided,
 * it generates a random integer from 0 to the given number. If two arguments are provided,
 * it generates a random integer from the first argument to the second argument.
 * If three arguments are provided, the first argument is the start of the range,
 * the second argument is the stop of the range, and the third argument is the step of the range.
 * @param {...number} args - The range parameters (start, stop, step)
 * @param {number} [start=0] The start of the range
 * @param {number} [stop] The stop of the range
 * @param {number} [step=1] The step of the range
 * @throws {Error} If the arguments count is not between 1 and 3.
 * @returns {number} A random integer within the specified range
 */
function randInt(...args) {
  const numberRange = new PyRange(...args);

  if (numberRange.length === 0) {
    return 0;
  }

  const randomIndex = Math.floor(Math.random() * (numberRange.length + 1));

  if (randomIndex === numberRange.length) {
    return numberRange.stop;
  }

  return numberRange.at(randomIndex);
}

/**
 * Generates a random number from the given range. The generated number will in the range start <= number < stop. If only one argument is given,
 * a random number from 0 to the given number is generated. If two arguments are given,
 * a random number from the first argument to the second argument is generated.
 * If three arguments are given, the first argument is the start of the range,
 * the second argument is the stop of the range, and the third argument is the step of the range.
 * @param {...number} args - The range parameters (start, stop, step)
 * @param {number} [start=0] The start of the range
 * @param {number} [stop] The stop of the range
 * @param {number} [step=1] The step of the range
 * @throws {Error} If the arguments count is not between 1 and 3.
 * @returns {number} The random number
 */
function randRange(...args) {
  const numberRange = new PyRange(...args);

  if (numberRange.length === 0) {
    return 0;
  }

  return numberRange.at(Math.floor(Math.random() * numberRange.length));
}

module.exports = {
  rand,
  uniform,
  randInt,
  randRange,
};
