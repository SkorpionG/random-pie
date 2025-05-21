/**
 * Basic usage examples for random-pie in JavaScript
 *
 * This example demonstrates different ways to import and use the random-pie package
 * with CommonJS syntax.
 */

// Method 1: Import the entire module
const randomPie = require("random-pie");
console.log("\n=== Method 1: Import the entire module ===");
console.log(`Random number: ${randomPie.rand()}`);
console.log(`Random integer (0-10): ${randomPie.randInt(0, 10)}`);
console.log(`Random item: ${randomPie.choice(["apple", "banana", "orange"])}`);

// Method 2: Import Random as a named export
const { Random } = require("random-pie");
console.log("\n=== Method 2: Import Random as a named export ===");
console.log(`Random number: ${Random.rand()}`);
console.log(`Random integer (0-10): ${Random.randInt(0, 10)}`);
console.log(`Random item: ${Random.choice(["apple", "banana", "orange"])}`);

// Method 3: Import Random as the default export
const RandomDefault = require("random-pie").default;
console.log("\n=== Method 3: Import Random as the default export ===");
console.log(`Random number: ${RandomDefault.rand()}`);
console.log(`Random integer (0-10): ${RandomDefault.randInt(0, 10)}`);
console.log(`Random item: ${RandomDefault.choice(["apple", "banana", "orange"])}`);

// Method 4: Import specific functions
const { rand, uniform, randInt, choice, shuffle, sample } = require("random-pie");
console.log("\n=== Method 4: Import specific functions ===");
console.log(`Random number: ${rand()}`);
console.log(`Random float (1-10): ${uniform(1, 10)}`);
console.log(`Random integer (0-10): ${randInt(0, 10)}`);
console.log(`Random item: ${choice(["apple", "banana", "orange"])}`);

// Array operations examples
console.log("\n=== Array operations examples ===");
const numbers = [1, 2, 3, 4, 5];
const fruits = ["apple", "banana", "orange", "grape", "kiwi"];

// Shuffle an array in place
const numbersToShuffle = [...numbers];
shuffle(numbersToShuffle);
console.log(`Shuffled array: ${JSON.stringify(numbersToShuffle)}`);

// Get a new shuffled array without modifying the original
const shuffledFruits = randomPie.shuffled(fruits);
console.log(`Original fruits: ${JSON.stringify(fruits)}`);
console.log(`Shuffled fruits: ${JSON.stringify(shuffledFruits)}`);

// Sample k items without replacement
console.log(`Sample 2 fruits: ${JSON.stringify(sample(fruits, 2))}`);

// Choose k items with replacement and weights
const weightedChoices = randomPie.choices(fruits, {
  weights: [5, 1, 1, 2, 1], // Apple has higher probability
  k: 3,
});
console.log(`Weighted choices (3 items): ${JSON.stringify(weightedChoices)}`);
