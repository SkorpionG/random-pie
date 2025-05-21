import Random from "./random";

// Re-export all named exports from number-random and array-random
export * from "./number-random";
export * from "./array-random";

// Also export Random as a named export
export { Random };

// And as the default export
export default Random;
