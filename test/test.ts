import Random from "../src/random";
import { rand, uniform, randInt, randRange } from "../src/number-random";

// Using the Random class
console.log(Random.rand());
console.log(Random.uniform(1.5, 3.8));
console.log(Random.uniform(1, 2));

console.log(Random.randInt(2));
console.log(Random.randRange(2));

// Using the direct functions
console.log(rand());
console.log(uniform(1.5, 3.8));
console.log(uniform(1, 2));

console.log(randInt(2));
console.log(randRange(2));
