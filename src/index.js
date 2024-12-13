const numberRandom = require("./number-random.js");
const arrayRandom = require("./array-random.js");
const Random = require("./random.js");

const exportedFunctions = {
  ...numberRandom,
  ...arrayRandom,
  Random,
};

module.exports = {
  ...exportedFunctions,
  default: Random,
};
