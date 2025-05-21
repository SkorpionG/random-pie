/**
 * Advanced usage examples for random-pie in TypeScript
 *
 * This example demonstrates more complex features of the random-pie package
 * such as weighted choices, sampling, and custom ranges with TypeScript.
 */

// Note: In a real project, you would use: import { choices, ... } from 'random-pie';
// But for this example, we're importing from the local source
import { randInt, randRange } from "../../src/number-random";
import { choices, sample, shuffle, shuffled } from "../../src/array-random";

// Example 1: Weighted random choices with type safety
console.log("\n=== Example 1: Weighted random choices with type safety ===");
const colors: string[] = ["red", "green", "blue", "yellow", "purple"];
const weights: number[] = [5, 2, 2, 1, 1]; // Red has higher probability

console.log("Selecting 10 colors with weights:");
const selectedColors: string[] = choices(colors, { weights, k: 10 });
console.log(selectedColors);

// Count occurrences to demonstrate weight effect
const colorCounts: Record<string, number> = selectedColors.reduce(
  (acc, color) => {
    acc[color] = (acc[color] || 0) + 1;
    return acc;
  },
  {} as Record<string, number>
);
console.log("Color distribution:");
console.log(colorCounts);

// Example 2: Sampling without replacement with custom types
console.log("\n=== Example 2: Sampling without replacement with custom types ===");

// Define a Card type
type Suit = "♠" | "♥" | "♦" | "♣";
type Rank = "A" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "J" | "Q" | "K";
interface Card {
  rank: Rank;
  suit: Suit;
  toString(): string;
}

// Create a deck of cards
const createDeck = (): Card[] => {
  const suits: Suit[] = ["♠", "♥", "♦", "♣"];
  const ranks: Rank[] = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
  const deck: Card[] = [];

  for (const suit of suits) {
    for (const rank of ranks) {
      deck.push({
        rank,
        suit,
        toString() {
          return `${this.rank}${this.suit}`;
        },
      });
    }
  }

  return deck;
};

const deck: Card[] = createDeck();

// Deal a poker hand (5 cards)
const hand: Card[] = sample(deck, 5);
console.log("Poker hand:");
console.log(hand.map((card) => card.toString()));

// Example 3: Custom ranges with step values
console.log("\n=== Example 3: Custom ranges with step values ===");
console.log("Random even number between 0 and 100:");
const evenNumber: number = randInt(0, 100, 2);
console.log(evenNumber);

console.log("Random odd number between 1 and 99:");
const oddNumber: number = randInt(1, 99, 2);
console.log(oddNumber);

console.log("Random multiple of 5 between 0 and 100:");
const multipleOf5: number = randInt(0, 100, 5);
console.log(multipleOf5);

// Example 4: Using randRange for different scenarios
console.log("\n=== Example 4: Using randRange for different scenarios ===");

// Generate a random number between 0 and 10 (exclusive)
const randomInRange: number = randRange(10);
console.log("Random number between 0 and 10 (exclusive):");
console.log(randomInRange);

// Generate a random number between 5 and 15 (exclusive)
const randomInCustomRange: number = randRange(5, 15);
console.log("Random number between 5 and 15 (exclusive):");
console.log(randomInCustomRange);

// Generate a random number between 0 and 20 with step 3
const randomWithStep: number = randRange(0, 20, 3);
console.log("Random number between 0 and 20 with step 3:");
console.log(randomWithStep);

// Example 5: Generic shuffling
console.log("\n=== Example 5: Generic shuffling ===");

interface User {
  id: number;
  name: string;
  role: string;
}

const users: User[] = [
  { id: 1, name: "Alice", role: "Admin" },
  { id: 2, name: "Bob", role: "User" },
  { id: 3, name: "Charlie", role: "User" },
  { id: 4, name: "Diana", role: "Manager" },
  { id: 5, name: "Evan", role: "User" },
];

console.log("Original users:");
console.log(users);

// Non-mutating shuffle (returns new array)
console.log("Using non-mutating shuffle:");
const shuffledUsers: User[] = shuffled(users);
console.log(shuffledUsers);

// In-place shuffle (modifies original)
const usersToShuffle: User[] = [...users];
shuffle(usersToShuffle);
console.log("After in-place shuffle:");
console.log(usersToShuffle);
