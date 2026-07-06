/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: "ts-jest",
  watchman: false,
  testEnvironment: "node",
  testMatch: [
    "**/__tests__/**/*.test.ts",
    "**/__tests__/**/*.test.js",
    "**/test/**/*.test.ts",
    "**/test/**/*.test.js",
  ],
  moduleNameMapper: {
    "^random-pie$": "<rootDir>/src/index.ts",
  },
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.json",
        diagnostics: {
          // Code 151002: "File ... is not under 'rootDir'" — a spurious ts-jest
          // warning that fires when ts-jest processes files outside the rootDir
          // (e.g. test/ while rootDir is src/). Safe to suppress.
          ignoreCodes: [151002],
        },
      },
    ],
  },
  verbose: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov"],
};
