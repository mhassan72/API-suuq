module.exports = {
    // Use ts-jest preset for TypeScript
    preset: 'ts-jest',
    
    // Test environment is Node.js
    testEnvironment: 'node',
  
    // Collect coverage for TypeScript files
    collectCoverage: true,
    
    // Where Jest should look for test files
    testMatch: ['**/tests/**/*.test.ts', '**/tests/**/*.spec.ts'],
    
    // Transform TypeScript and other files with the appropriate transformer
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
  
    // Ignore transforming files in node_modules by default
    transformIgnorePatterns: ['node_modules/(?!your-package-to-transform/)'],
  
    // Configure module paths and aliases if needed (optional)
    moduleNameMapper: {
      '^@controllers/(.*)$': '<rootDir>/src/controllers/$1',
      '^@services/(.*)$': '<rootDir>/src/services/$1',
      // Add more aliases as needed
    },
  
    // Configure test coverage collection and reports
    coverageDirectory: './coverage',
    coverageReporters: ['json', 'lcov', 'text', 'clover'],
    
    // Clear mock calls and timers between tests (optional)
    clearMocks: true,
    
    // Setup files for jest (optional, for setup files or global mocks)
    // setupFiles: ['<rootDir>/tests/setup.ts'], 
  
    // Add other Jest configurations if needed, such as for verbose output
    verbose: true,
  };
  