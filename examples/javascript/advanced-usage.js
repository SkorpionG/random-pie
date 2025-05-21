/**
 * Advanced usage examples for random-pie in JavaScript
 *
 * This example demonstrates more complex features of the random-pie package
 * such as weighted choices, sampling, and custom ranges.
 */

const { choices, sample, randInt, randRange, shuffle, shuffled } = require("random-pie");

// Example 1: Weighted random choices
console.log("\n=== Example 1: Weighted random choices ===");
const colors = ["red", "green", "blue", "yellow", "purple"];
const weights = [5, 2, 2, 1, 1]; // Red has higher probability

console.log("Selecting 10 colors with weights:");
const selectedColors = choices(colors, { weights, k: 10 });
console.log(selectedColors);

// Count occurrences to demonstrate weight effect
const colorCounts = selectedColors.reduce((acc, color) => {
  acc[color] = (acc[color] || 0) + 1;
  return acc;
}, {});
console.log("Color distribution:");
console.log(colorCounts);

// Example 2: Sampling without replacement
console.log("\n=== Example 2: Sampling without replacement ===");
const deck = [
  "A♠",
  "2♠",
  "3♠",
  "4♠",
  "5♠",
  "6♠",
  "7♠",
  "8♠",
  "9♠",
  "10♠",
  "J♠",
  "Q♠",
  "K♠",
  "A♥",
  "2♥",
  "3♥",
  "4♥",
  "5♥",
  "6♥",
  "7♥",
  "8♥",
  "9♥",
  "10♥",
  "J♥",
  "Q♥",
  "K♥",
  "A♦",
  "2♦",
  "3♦",
  "4♦",
  "5♦",
  "6♦",
  "7♦",
  "8♦",
  "9♦",
  "10♦",
  "J♦",
  "Q♦",
  "K♦",
  "A♣",
  "2♣",
  "3♣",
  "4♣",
  "5♣",
  "6♣",
  "7♣",
  "8♣",
  "9♣",
  "10♣",
  "J♣",
  "Q♣",
  "K♣",
];

// Deal a poker hand (5 cards)
const hand = sample(deck, 5);
console.log("Poker hand:");
console.log(hand);

// Example 3: Custom ranges with step values
console.log("\n=== Example 3: Custom ranges with step values ===");
console.log("Random even number between 0 and 100:");
console.log(randInt(0, 100, 2));

console.log("Random odd number between 1 and 99:");
console.log(randInt(1, 99, 2));

console.log("Random multiple of 5 between 0 and 100:");
console.log(randInt(0, 100, 5));

// Example 4: Using randRange for different scenarios
console.log("\n=== Example 4: Using randRange for different scenarios ===");

// Generate a random number between 0 and 10 (exclusive)
const randomInRange = randRange(10);
console.log("Random number between 0 and 10 (exclusive):");
console.log(randomInRange);

// Generate a random number between 5 and 15 (exclusive)
const randomInCustomRange = randRange(5, 15);
console.log("Random number between 5 and 15 (exclusive):");
console.log(randomInCustomRange);

// Generate a random number between 0 and 20 with step 3
const randomWithStep = randRange(0, 20, 3);
console.log("Random number between 0 and 20 with step 3:");
console.log(randomWithStep);

// Example 5: Shuffling comparison
console.log("\n=== Example 5: Shuffling comparison ===");
const originalArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log("Original array:");
console.log(originalArray);

// In-place shuffle (modifies original)
const arrayToShuffle = [...originalArray];
shuffle(arrayToShuffle);
console.log("After in-place shuffle:");
console.log(arrayToShuffle);

// Non-mutating shuffle (returns new array)
console.log("Using non-mutating shuffle:");
const newShuffledArray = shuffled(originalArray);
console.log(newShuffledArray);
console.log("Original array remains unchanged:");
console.log(originalArray);
