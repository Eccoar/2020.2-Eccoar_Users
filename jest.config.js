module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	collectCoverage: true,
	testPathIgnorePatterns: ['build'],
	moduleNameMapper: {
		'@controllers/(.*)': '<rootDir>/src/controllers/$1',
		'@services/(.*)': '<rootDir>/src/services/$1',
		'@utils/(.*)': '<rootDir>/src/utils/$1',
	},
};
