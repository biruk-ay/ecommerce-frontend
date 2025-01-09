module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	collectCoverageFrom: ['src/**/*.ts'],
	coverageThreshold: {
	  global: {
		branches: 0,
		functions: 0,
		lines: 0,
		statements: 0,
	  },
	},
	moduleDirectories: ['node_modules', 'src'],
	moduleNameMapper: {
		"^@/(.*)$": "<rootDir>/src/$1"
	},
	transform: {
		'^.+\\.ts?$': 'ts-jest',
	},
	transformIgnorePatterns: ['<rootDir>/node_modules/'],
	noStackTrace: false,
	testTimeout: 10000000,
	detectOpenHandles: true,
	
  };