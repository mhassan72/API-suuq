import { EnvironmentManager } from '../../src/environment/EnvironmentManager'; // Adjust path as needed

describe('EnvironmentManager', () => {
  let envManager: EnvironmentManager;

  beforeEach(() => {
    envManager = new EnvironmentManager();

    // Set default environment variables for testing
    process.env = {
      DEBUG: 'true',
      PORT: '8080',
      JWT_SECRET: 'test_secret',
      AWS_REGION: 'us-east-1',
    };
  });

  afterEach(() => {
    // Clear environment variables after each test
    process.env = {};
  });

  it('should return the value of an existing environment variable', () => {
    const result = envManager.getEnv('JWT_SECRET');
    expect(result).toBe('test_secret');
  });

  it('should return the default value if the environment variable is not set', () => {
    const result = envManager.getEnv('UNDEFINED_VAR', 'default_value');
    expect(result).toBe('default_value');
  });

  it('should return the number value of an environment variable', () => {
    const result = envManager.getNumberEnv('PORT');
    expect(result).toBe(8080);
  });

  it('should return the default number if the environment variable is not set', () => {
    const result = envManager.getNumberEnv('UNDEFINED_VAR', 1234);
    expect(result).toBe(1234);
  });

  it('should return true if DEBUG mode is enabled', () => {
    const result = envManager.isDebugMode();
    expect(result).toBe(true);
  });

  it('should return false if DEBUG mode is not enabled', () => {
    process.env.DEBUG = 'false';
    const result = envManager.isDebugMode();
    expect(result).toBe(false);
  });

  it('should return the port from environment variables', () => {
    const result = envManager.getPort();
    expect(result).toBe(8080);
  });

  it('should return the default port if PORT is not set', () => {
    delete process.env.PORT;
    const result = envManager.getPort();
    expect(result).toBe(3000); // Default port
  });

  it('should return the default port if TEST_PORT is not set', () => {
    delete process.env.PORT;
    const result = envManager.getTestPort();
    expect(result).toBe(3001); // Default port
  });

  it('should return the JWT secret from environment variables', () => {
    const result = envManager.getJwtSecret();
    expect(result).toBe('test_secret');
  });

  it('should return the default JWT secret if JWT_SECRET is not set', () => {
    delete process.env.JWT_SECRET;
    const result = envManager.getJwtSecret();
    expect(result).toBe('default_secret'); // Default JWT secret
  });

  it('should return the AWS region from environment variables', () => {
    const result = envManager.getAWSRegion();
    expect(result).toBe('us-east-1');
  });

  it('should return the default AWS region if AWS_REGION is not set', () => {
    delete process.env.AWS_REGION;
    const result = envManager.getAWSRegion();
    expect(result).toBe('eu-west-2'); // Default AWS region
  });
});
