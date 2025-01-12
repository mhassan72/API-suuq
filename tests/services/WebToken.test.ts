import WebToken from '../../src/services/WebToken';
import { envManager } from '../../src/environment/EnvironmentManager';
import { JWTPayload } from 'jose';

// Mock environment manager
jest.mock('../../src/environment/EnvironmentManager', () => ({
  envManager: {
    getJwtSecret: jest.fn(),
  },
}));

describe('WebToken', () => {
    const mockJwtSecret = 'mockSecretKey';
  
    // Ensure that the mock for getJwtSecret is set before WebToken instantiation
    beforeEach(() => {
      (envManager.getJwtSecret as jest.Mock).mockReturnValue(mockJwtSecret);
    });
  
    // Test: Should throw error if secret key is not provided
    it('should throw an error if no secret key is provided', () => {
      (envManager.getJwtSecret as jest.Mock).mockReturnValue(null); // Simulate missing secret
      expect(() => new WebToken()).toThrowError(
        'A secret key is required to initialize WebToken.'
      );
    });
  
    // Test: Should encode payload and return a valid JWT token
    it('should encode a payload into a JWT token', async () => {
        const wt = new WebToken();
        const payload: JWTPayload = { userId: 123 };
        const token = await wt.encode(payload, '1h'); // Token expires in 1 hour
      
        expect(token).toBeDefined();
        expect(typeof token).toBe('string');
        // Check if the token matches the general JWT format (three base64url-encoded parts)
        expect(token).toMatch(/^[A-Za-z0-9\-._~]+\.[A-Za-z0-9\-._~]+\.[A-Za-z0-9\-._~]+$/);
      });
  
    // Test: Should decode a valid JWT token
    it('should decode a JWT token to its payload', async () => {
        const wt = new WebToken();
        const payload: JWTPayload = { userId: 123 };
        const token = await wt.encode(payload, '1h'); // Token expires in 1 hour
      
        const decodedPayload = await wt.decode(token);
        // Remove the `exp` field before comparison
        const { exp, ...decodedPayloadWithoutExp } = decodedPayload;
      
        expect(decodedPayloadWithoutExp).toEqual(payload);
    });
  
    // Test: Should return false for invalid token during validation
    it('should return false for invalid token', async () => {
      const wt = new WebToken();
      const invalidToken = 'invalid.token';
  
      const isValid = await wt.validate(invalidToken);
      expect(isValid).toBe(false);
    });
  
    // Test: Should return true for valid token during validation
    it('should return true for valid token', async () => {
      const wt = new WebToken();
      const payload: JWTPayload = { userId: 123 };
      const token = await wt.encode(payload, '1h');
  
      const isValid = await wt.validate(token);
      expect(isValid).toBe(true);
    });
  });