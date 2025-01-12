import { SignJWT, jwtVerify, type JWTPayload } from 'jose';
import { envManager } from '../environment/EnvironmentManager';

export  default class WebToken {
  private secret: Uint8Array;

  constructor() {
    const secretKey = envManager.getJwtSecret();
    if (!secretKey) {
      throw new Error('A secret key is required to initialize WebToken.');
    }
    this.secret = new TextEncoder().encode(secretKey);
  }

  public async encode(payload: JWTPayload, expiresIn: string): Promise<string> {
    return await new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime(expiresIn)
      .sign(this.secret);
  }

  public async decode(token: string): Promise<JWTPayload> {
    const { payload } = await jwtVerify(token, this.secret);
    return payload;
  }

  public async validate(token: string): Promise<boolean> {
    try {
      await this.decode(token);
      return true;
    } catch {
      return false;
    }
  }
}
