const { rand, uniform, randInt, randRange } = require("./number-random.js");

const {
  choice,
  choices,
  shuffle,
  shuffled,
  sample,
} = require("./array-random.js");

class Random {
  static rand() {
    return rand();
  }

  static uniform(min, max) {
    return uniform(min, max);
  }

  static randInt(...args) {
    return randInt(...args);
  }

  static randRange(...args) {
    return randRange(...args);
  }

  static choice(arr) {
    return choice(arr);
  }

  static choices(arr, options) {
    return choices(arr, options);
  }

  static shuffle(arr) {
    shuffle(arr);
  }

  static shuffled(arr) {
    return shuffled(arr);
  }

  static sample(arr, k, counts) {
    return sample(arr, k, counts);
  }
}

module.exports = Random;
