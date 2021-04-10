module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	testPathIgnorePatterns: ['build'],
	moduleNameMapper: {
		'@controllers/(.*)': '<rootDir>/src/controllers/$1',
		'@entity/(.*)': '<rootDir>/src/entity/$1',
		'@repositories/(.*)': '<rootDir>/src/repositories/$1',
		'@services/(.*)': '<rootDir>/src/services/$1',
		'@utils/(.*)': '<rootDir>/src/utils/$1',
	},
};
