export default {
  transform: {},
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.test.js", "**/test/**/*.test.js"],
  moduleNameMapper: {
    "^random-pie$": "<rootDir>/src/index.js",
  },
  verbose: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov"],
};
