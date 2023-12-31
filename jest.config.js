module.exports = {
    testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
    transform: {
        "^.+\\.(js|jsx|ts|tsx|mjs)$": "babel-jest",
        "\\.(jpg|jpeg|png|gif)$": "jest-transform-stub"
      }
  };
  