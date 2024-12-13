function accumulate(arr) {
  if (!Array.isArray(arr)) {
    throw new TypeError("Argument must be an array");
  }
  if (arr.length === 0) {
    throw new RangeError("Input array cannot be empty");
  }

  return arr.reduce((acc, curr) => {
    const nextSum = (acc.length > 0 ? acc[acc.length - 1] : 0) + curr;
    acc.push(nextSum);
    return acc;
  }, []);
}

module.exports = {
  accumulate,
};
