module.exports = {
  testEnvironment: 'jsdom',  // Set the test environment to jsdom
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
};
