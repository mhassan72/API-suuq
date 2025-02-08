import { SignJWT, jwtVerify, type JWTPayload } from 'jose';
import { envManager } from '../environment/EnvironmentManager';

export default class TokenService {
  private readonly secret: Uint8Array;

  constructor() {
    const secretKey = envManager.getJwtSecret();
    if (!secretKey) {
      throw new Error('JWT_SECRET is required in environment configuration');
    }
    this.secret = new TextEncoder().encode(secretKey);
  }

  public async generateToken(payload: JWTPayload, expiresIn: string): Promise<string> {
    return new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime(expiresIn)
      .sign(this.secret);
  }

  public async decodeToken(token: string): Promise<JWTPayload> {
    const { payload } = await jwtVerify(token, this.secret);
    return payload;
  }

  public async validateToken(token: string): Promise<boolean> {
    try {
      await this.decodeToken(token);
      return true;
    } catch {
      return false;
    }
  }
}