/**
 * This file tests all the different ways to import the random-pie package in CommonJS
 * Run with: node test/import-tests/import-test.js
 */

console.log("=== Testing CommonJS imports ===");

// Test 1: Import the entire module
console.log("\n--- Test 1: Import the entire module ---");
const randomPie = require("../../dist/index.js");
console.log("randomPie object keys:", Object.keys(randomPie));
console.log("randomPie.rand() =", randomPie.rand());
console.log("randomPie.Random.rand() =", randomPie.Random.rand());
console.log("randomPie.default.rand() =", randomPie.default.rand());

// Test 2: Import Random as a named export
console.log("\n--- Test 2: Import Random as a named export ---");
const { Random } = require("../../dist/index.js");
console.log("Random.rand() =", Random.rand());
console.log("Random.uniform(1, 10) =", Random.uniform(1, 10));

// Test 3: Import Random as a default export
console.log("\n--- Test 3: Import Random as a default export ---");
const RandomDefault = require("../../dist/index.js").default;
console.log("RandomDefault.rand() =", RandomDefault.rand());
console.log("RandomDefault.uniform(1, 10) =", RandomDefault.uniform(1, 10));

// Test 4: Import specific functions
console.log("\n--- Test 4: Import specific functions ---");
const { rand, uniform, choice } = require("../../dist/index.js");
console.log("rand() =", rand());
console.log("uniform(1, 10) =", uniform(1, 10));
console.log("choice([1, 2, 3]) =", choice([1, 2, 3]));

console.log("\n=== All CommonJS import tests passed! ===");
