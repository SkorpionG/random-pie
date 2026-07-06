# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - 2024-12-12

### Added

- Initial JavaScript implementation.
- Added Python-style random number generation utilities.
- Added array randomization utilities.
- Added Jest test coverage for the initial API.

## [1.0.1] - 2025-05-19

### Changed

- Upgraded `range-pie` from v1.0.1 to v2.1.0.
- Improved package metadata with homepage and repository information.
- Expanded npm package ignore rules.
- Added Prettier configuration.

### Fixed

- Updated the `range-pie` import to use the named `PyRange` export.

## [2.0.0] - 2025-05-21

### Changed

- Rewrote the package in TypeScript.
- Added generated type declarations for all public functions and classes.
- Updated the build process to emit JavaScript and TypeScript declarations from `dist/`.
- Reworked package exports for CommonJS, ESM-style TypeScript imports, and default/named `Random` exports.
- Converted the test suite from JavaScript to TypeScript.
- Expanded README documentation with TypeScript examples.

### Added

- Added `Random` class TypeScript implementation.
- Added `ChoicesOptions` public type.
- Added JavaScript and TypeScript example projects.
- Added CommonJS and TypeScript import tests.
- Added production TypeScript build config.

## [2.0.1] - 2025-06-04

### Added

- Added ESLint flat configuration with TypeScript support.
- Added `clean-maps.js` to remove generated source maps before publishing.
- Added lint and lint-fix scripts.
- Added shuffle and sample examples to TypeScript basic usage docs.

### Changed

- Updated `prepublishOnly` to clean, build, remove source maps, and run tests.
- Updated clean script to remove both `dist` and `coverage`.
- Excluded coverage and examples from TypeScript compilation.
- Updated npm ignore rules to keep `dist` package output while excluding source maps.

### Fixed

- Fixed a shuffled-array test that assigned an unused value while checking original-array immutability.
- Improved TypeScript import-test output for shuffled values.

## [2.0.2] - 2025-10-03

### Added

- Added npm package and license badges to the README.
- Added package `bugs` metadata.
- Added `.npmrc` with npm registry, exact-save, and engine-strict settings.
- Added ESLint overrides for example and test files.
- Added `.specstory` to `.gitignore`.

### Changed

- Upgraded `range-pie` to v2.4.0.
- Updated project dependencies and dev dependencies.
- Restricted published files to JavaScript and declaration files in `dist/`, excluding source maps.
- Switched TypeScript module and module resolution settings to `node16`.
- Added Node engine metadata.

## [2.0.3] - 2026-03-10

### Added

- Added Husky pre-commit hook support.
- Added lint-staged configuration for staged TypeScript, JavaScript, JSON, and Markdown files.
- Added `prepare`, `typecheck`, `lint-staged`, and `precommit` scripts.

### Changed

- Upgraded `range-pie` to v2.4.1.
- Updated and pinned development dependencies.
- Disabled Watchman in Jest config.
- Renamed the `linter` script to `typecheck`.

## [2.1.0] - 2026-07-06

### Added

- Added `test:coverage` script.
- Added VS Code extension recommendations and workspace settings.
- Added mocked-random tests for `choices()` cumulative-weight binary search branches.
- Added boundary tests for `sample()` with `counts`.
- Added finite-number return tests for `randInt()` and `randRange()`.

### Changed

- Upgraded `range-pie` to v3.0.0.
- Upgraded TypeScript to v6 and changed the TypeScript target to ES2022.
- Updated project dependencies and dev dependencies to latest available versions.
- Raised the Node.js engine requirement to `>=22.22.1` to match the latest dev tooling.
- Broadened `format` and `format:check` scripts to scan all project files.
- Updated pre-commit behavior to run both lint-staged and tests.
- Updated production publishing to rely on `sourceMap: false` instead of deleting source maps after build.
- Translated test names from Chinese to English.
- Expanded test coverage, including full coverage for `array-random.ts`.
- Updated README formatting and examples.

### Fixed

- Fixed `sample()` incorrectly throwing when `k > arr.length` but `counts` expands the population enough.
- Fixed `choices()` accepting invalid `cumWeights` by validating non-negative values, non-decreasing order, and positive total weight.
- Fixed `uniform()` documentation to describe the actual half-open range `[min, max)`.
- Fixed README documentation for `weights`, `cumWeights`, and `sample()` counts behavior.
- Fixed `Random.sample()` API comments to describe `counts` as repeat counts rather than weights.
- Fixed TypeScript compatibility with `range-pie` constructor overloads.
- Ensured `randInt()` and `randRange()` return numbers rather than `undefined`.

### Removed

- Removed unused `clean-maps.js`.
