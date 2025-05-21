# random-pie Examples

This directory contains examples demonstrating how to use the random-pie package in both JavaScript and TypeScript.

## Directory Structure

```text
examples/
├── javascript/
│   ├── basic-usage.js    - Basic usage examples with CommonJS imports
│   └── advanced-usage.js - Advanced features with CommonJS imports
├── typescript/
│   ├── basic-usage.ts    - Basic usage examples with TypeScript/ESM imports
│   └── advanced-usage.ts - Advanced features with TypeScript and type safety
└── README.md             - This file
```

## Running the Examples

### JavaScript Examples

To run the JavaScript examples, you need Node.js installed. Navigate to the project root and run:

```bash
# Run the basic JavaScript example
node examples/javascript/basic-usage.js

# Run the advanced JavaScript example
node examples/javascript/advanced-usage.js
```

### TypeScript Examples

To run the TypeScript examples, you need TypeScript and ts-node installed. If you don't have ts-node installed globally, you can run the examples using npx:

```bash
# Run the basic TypeScript example
npx ts-node examples/typescript/basic-usage.ts

# Run the advanced TypeScript example
npx ts-node examples/typescript/advanced-usage.ts
```

Or if you have ts-node installed globally:

```bash
# Run the basic TypeScript example
ts-node examples/typescript/basic-usage.ts

# Run the advanced TypeScript example
ts-node examples/typescript/advanced-usage.ts
```

## Example Contents

### Basic Usage Examples

These examples demonstrate:

- Different ways to import the package (default export, named exports, specific functions)
- Basic random number generation
- Basic array operations (choice, shuffle, sample)
- Type-safe usage in TypeScript

### Advanced Usage Examples

These examples demonstrate:

- Weighted random choices
- Sampling without replacement
- Custom ranges with step values
- Type-safe operations with custom types
- Comparison between in-place and non-mutating shuffling

## Building the Package

If you've made changes to the package and want to test the examples with your changes, make sure to build the package first:

```bash
npm run build
```

This will compile the TypeScript source files to JavaScript in the dist directory, which the examples will then use.
