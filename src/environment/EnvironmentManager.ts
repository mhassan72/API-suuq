import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export class EnvironmentManager {
  public getEnv(variable: string, defaultValue: string = ''): string {
    return process.env[variable] || defaultValue;
  }

  public getNumberEnv(variable: string, defaultValue: number = 0): number {
    return parseInt(process.env[variable] || String(defaultValue), 10);
  }

  public isDebugMode(): boolean {
    return process.env.DEBUG === 'true';
  }

  public getPort(): number {
    return this.getNumberEnv('PORT', 3000);
  }

  public getJwtSecret(): string {
    return this.getEnv('JWT_SECRET', 'default_secret');
  }

  public getAWSRegion(): string {
    return this.getEnv('AWS_REGION', 'eu-west-2');
  }
}

export const envManager = new EnvironmentManager();
