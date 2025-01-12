import express from 'express';
import { AppConfig } from '../config/AppConfig';
import { Router } from '../routes/Router';
import { envManager } from '../environment/EnvironmentManager';
import DynamicRoutes from '../routes';

export class Server {
  private app: express.Application;

  constructor() {
    this.app = express();
    this.configureServer();
  }

  private configureServer(): void {
    // Configuring app with middleware (from AppConfig)
    AppConfig.configure(this.app);

    // Setup dynamic routes
    const router = new Router(DynamicRoutes);
    this.app.use(router.getRouter());
  }

  public start(): void {
    const port = envManager.getPort();
    this.app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  }
}
