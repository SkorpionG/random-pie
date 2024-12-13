# random-pie

A lightweight JavaScript library providing Python-style random number generation and randomization utilities. This lightweight utility module implements the most common functions from Python's random module, making it intuitive for Python developers working with JavaScript.

⚠️ **Security Notice**: This module is not suitable for cryptographic or security-sensitive applications. For cryptographically secure operations, use Node.js's crypto module or other third-party alternatives instead.

## Table of Contents

- [Installation](#installation)
- [Basic Usage](#basic-usage)
- [API Reference](#api-reference)

  - [Number Generation](#number-generation)

    - [rand()](#rand)
    - [uniform()](#uniform)
    - [randInt()](#randint)
    - [randRange()](#randrange)

  - [Array Operations](#array-operations)

    - [choice()](#choice)
    - [choices()](#choices)
    - [shuffle()](#shuffle)
    - [shuffled()](#shuffled)
    - [sample()](#sample)

- [Class Interface](#class-interface)
- [API Reference Table](#api-reference-table)
  
  - [Number Functions](#number-functions)
  - [Array Functions](#array-functions)

## Installation

```bash
npm install random-pie
```

## Basic Usage

```javascript
const { Random } = require('random-pie');
// or
const Random = require('random-pie');
// or import specific functions
const { rand, randInt, choice } = require('random-pie');
```

## API Reference

### Number Generation

#### rand()

Similar to [`random.rand()`](https://docs.python.org/3/library/random.html#random.random) in Python, which returns a random float value between 0 (inclusive) and 1 (exclusive). This function is equivalent to `Math.random()`.

```javascript
// Generate float between 0 and 1
rand(); // 0.7249081475312897
```

#### uniform()

Similar to [`random.uniform(min, max)`](https://docs.python.org/3/library/random.html#random.uniform) in Python, which returns a random float value between min and max (both inclusive). Min and max values can be a floating point number.

```javascript
// Generate float in range
uniform(1.5, 3.8); // 2.341829378123

uniform(1, 5); // 3
```

#### randInt()

Similar to [`random.randint(min, max)`](https://docs.python.org/3/library/random.html#random.randint) in Python. Returns a random integer such that min <= number <= max. Different from the Python's random.randint() function, the `randInt()` function supports a third argument, which is the step size.

```javascript
// Random integer from 0 to 10
randInt(10); // 7

// Random integer from 1 (start) to 10 (stop)
randInt(1, 10); // 5

// Random integer with step
randInt(0, 10, 2); // 0, 2, 4, 6, 8, or 10
```

#### randRange()

Similar to [`random.randrange(start, stop[, step])`](https://docs.python.org/3/library/random.html#random.randrange) in Python and the `randInt` function. Returns a random integer such that start <= number < stop (exclusive at stop).

```javascript
// Random integer from 0 to 4 (stop - 1)
randRange(5); // 3

randRange(1, 10); // 7

randRange(0, 10, 2); // 0, 2, 4, 6, 8
```

### Array Operations

#### choice()

Similar to [`random.choice()`](https://docs.python.org/3/library/random.html#random.choice) in Python, which returns a random element from the input array.

```javascript
// Select a random item from the array
const randomFruit = choice(['apple', 'banana', 'orange']); // 'banana'

```

#### choices()

Similar to [`random.choices()`](https://docs.python.org/3/library/random.html#random.choices). This function accepts two arguments, the first one being an array to choose from, and the second one being an object that contains configuration to the choices function. The object at the second argument can contain the following properties:

- weights: An array that contain the weight the given array in the first argument. Optional and is default to null.
- cumWeights: Similar to weights, except the array given to this property should be the cumulative weights. Optional and is default to null.
- k: The number of elements to select from the array. Optional and is default to 1.

If neither weights or cumWeights are provided, the array element is selected on based on equal probability. If both weights and cumWeights are provided, an `TypeError` will the thrown. Both weights or cumWeights should be an array with equal length as the array in the first argument.

```javascript
// Multiple random selections with weights
const randomColors = choices(['red', 'green', 'blue'], {
    weights: [2, 1, 1],
    k: 3
}); // ['red', 'red', 'blue']
```

#### shuffle()

Similar to [`random.shuffle()`](https://docs.python.org/3/library/random.html#random.shuffle) in Python. This function does not return the shuffled array, but shuffles it in place and modify the original array.

```javascript
// Shuffle array in place
const arr = [1, 2, 3, 4, 5];
shuffle(arr); // [3, 1, 5, 2, 4]
```

#### shuffled()

Works the same way as the `shuffle' function, but return a new, shuffled array. It does not modify the original array.

```javascript
// Shuffle array in place
const arr = [1, 2, 3, 4, 5];
const shuffledArr = shuffled(arr); // [3, 1, 5, 2, 4]
```

#### sample()

Similar to [`random.sample()`](https://docs.python.org/3/library/random.html#random.sample) in Python.

Different from the `choices` function, this function does not select repeated values. If multiple repeated values are present in the first argument array, each occurrence of the repeated value is possible to be sampled.

```javascript
// Sample k items from array
const randSample = sample(['a', 'b', 'c', 'd'], 2); // ['b', 'd']
```

## Class Interface

Use the Random class for a more object-oriented approach:

```javascript
const random = new Random();

random.randInt(1, 10);
random.choice(['heads', 'tails']);
random.shuffle([1, 2, 3, 4, 5]);
```

## API Reference Table

### Number Functions

| Function | Description |
|----------|-------------|
| rand() | Returns float between 0 and 1 |
| uniform(min, max) | Returns float between min and max |
| randInt(...args) | Returns integer from range |
| randRange(...args) | Returns number from range |

### Array Functions

| Function | Description |
|----------|-------------|
| choice(arr) | Returns random item from array |
| choices(arr, options) | Returns multiple random items |
| shuffle(arr) | Shuffles array in place |
| shuffled(arr) | Returns a shuffled array |
| sample(arr, k, counts) | Returns k random items |
