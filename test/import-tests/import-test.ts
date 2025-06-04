/**
 * This file tests all the different ways to import the random-pie package in TypeScript
 * Run with: npx ts-node test/import-tests/import-test.ts
 */

console.log("=== Testing TypeScript/ESM imports ===");

// Test 1: Import Random as the default export
console.log("\n--- Test 1: Import Random as the default export ---");
import RandomDefault from "../../src/index";
console.log("RandomDefault.rand() =", RandomDefault.rand());
console.log("RandomDefault.uniform(1, 10) =", RandomDefault.uniform(1, 10));

// Test 2: Import Random as a named export
console.log("\n--- Test 2: Import Random as a named export ---");
import { Random } from "../../src/index";
console.log("Random.rand() =", Random.rand());
console.log("Random.uniform(1, 10) =", Random.uniform(1, 10));

// Test 3: Import specific functions
console.log("\n--- Test 3: Import specific functions ---");
import {
  rand,
  uniform,
  randInt,
  choice,
  choices,
  shuffle,
  shuffled,
  sample,
} from "../../src/index";
console.log("rand() =", rand());
console.log("uniform(1, 10) =", uniform(1, 10));
console.log("randInt(1, 10) =", randInt(1, 10));
console.log("choice([1, 2, 3]) =", choice([1, 2, 3]));

// Test 4: Type safety tests
console.log("\n--- Test 4: Type safety tests ---");
const randomNumber: number = rand();
console.log("randomNumber:", randomNumber);

const items: string[] = ["apple", "banana", "orange"];
const selectedItem: string = choice(items);
console.log("selectedItem:", selectedItem);

const numbers: number[] = [1, 2, 3, 4, 5];
shuffle(numbers);
console.log("shuffledNumbers:", numbers);

const shuffledItems: string[] = shuffled(["a", "b", "c", "d", "e"]);
console.log("shuffledItems:", shuffledItems);

const randomItems: string[] = choices(items, { k: 2 });
console.log("randomItems:", randomItems);

const sampledItems: string[] = sample(items, 2);
console.log("sampledItems:", sampledItems);

// Test 5: Import everything with namespace
console.log("\n--- Test 5: Import everything with namespace ---");
import * as randomPie from "../../src/index";
console.log("randomPie.rand() =", randomPie.rand());
console.log("randomPie.Random.rand() =", randomPie.Random.rand());
console.log("randomPie.default.rand() =", randomPie.default.rand());

console.log("\n=== All TypeScript/ESM import tests passed! ===");
