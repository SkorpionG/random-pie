/**
 * Basic usage examples for random-pie in TypeScript
 *
 * This example demonstrates different ways to import and use the random-pie package
 * with TypeScript/ESM syntax.
 */

// Method 1: Import the default export
// Note: In a real project, you would use: import Random from 'random-pie';
// But for this example, we're importing from the local source
import Random from "../../src/random";
console.log("\n=== Method 1: Import Random as the default export ===");
console.log(`Random number: ${Random.rand()}`);
console.log(`Random integer (0-10): ${Random.randInt(0, 10)}`);
console.log(`Random item: ${Random.choice(["apple", "banana", "orange"])}`);

// Method 2: Import Random as a named export
// Note: In a real project, you would use: import { Random } from 'random-pie';
// But for this example, we're importing from the local source
import { Random as RandomNamed } from "../../src/index";
console.log("\n=== Method 2: Import Random as a named export ===");
console.log(`Random number: ${RandomNamed.rand()}`);
console.log(`Random integer (0-10): ${RandomNamed.randInt(0, 10)}`);
console.log(`Random item: ${RandomNamed.choice(["apple", "banana", "orange"])}`);

// Method 3: Import specific functions
// Note: In a real project, you would use: import { rand, ... } from 'random-pie';
// But for this example, we're importing from the local source
import { rand, uniform, randInt } from "../../src/number-random";
import { choice, shuffle, sample } from "../../src/array-random";
console.log("\n=== Method 3: Import specific functions ===");
console.log(`Random number: ${rand()}`);
console.log(`Random float (1-10): ${uniform(1, 10)}`);
console.log(`Random integer (0-10): ${randInt(0, 10)}`);
console.log(`Random item: ${choice(["apple", "banana", "orange"])}`);

// Method 4: Import everything with namespace
// Note: In a real project, you would use: import * as randomPie from 'random-pie';
// But for this example, we're importing directly
import * as randomPie from "../../src/index";
console.log("\n=== Method 4: Import everything with namespace ===");
console.log(`Random number: ${randomPie.rand()}`);
console.log(`Random integer (0-10): ${randomPie.randInt(0, 10)}`);
console.log(`Random item: ${randomPie.choice(["apple", "banana", "orange"])}`);

// Type-safe examples
console.log("\n=== Type-safe examples ===");

// Type annotations
const randomNumber: number = rand();
console.log(`Random number with type annotation: ${randomNumber}`);

// Generic type parameters
const fruits: string[] = ["apple", "banana", "orange", "grape", "kiwi"];
const selectedFruit: string = choice<string>(fruits);
console.log(`Selected fruit with type parameter: ${selectedFruit}`);

// Type inference
const numbers = [1, 2, 3, 4, 5];
const shuffledNumbers = randomPie.shuffled(numbers); // inferred as number[]
console.log(`Shuffled numbers: ${shuffledNumbers}`);

// Array operations with type safety
const sampledItems: string[] = sample(fruits, 2);
console.log(`Sampled items: ${sampledItems}`);

// Using with custom types
interface Product {
  id: number;
  name: string;
  price: number;
}

const products: Product[] = [
  { id: 1, name: "Laptop", price: 999 },
  { id: 2, name: "Phone", price: 699 },
  { id: 3, name: "Tablet", price: 399 },
  { id: 4, name: "Headphones", price: 149 },
];

const randomProduct: Product = choice<Product>(products);
console.log("Random product:");
console.log(randomProduct);
