import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors'
import { envManager } from '../environment/EnvironmentManager';

export class AppConfig {
  public static configure(app: Application): void {
    const environment = envManager.getEnv('NODE_ENV', 'development');
    const debug = envManager.isDebugMode();

    console.log(`Running in ${environment} mode`);

    if (debug) {
      app.use(AppConfig.debugMiddleware);
    }

    app.use(cors<Request>())
    app.use(express.json());
  }

  private static debugMiddleware(req: Request, res: Response, next: NextFunction): void {
    console.log(`DEBUG: ${req.method} ${req.url}`);
    next();
  }
}
