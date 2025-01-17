import express from 'express';
import cors from 'cors'; // Import the cors package
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
    // Enable CORS for all routes and allow any origin
    this.app.use(cors({
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    }))
    // Configuring app with middleware (from AppConfig)
    AppConfig.configure(this.app);
    // Setup dynamic routes
    const router = new Router(DynamicRoutes);
    this.app.use(router.getRouter());
  }

  public start(): any {
    const port = envManager.getPort();
    const server = this.app.listen(port, '0.0.0.0', () => {
      console.log(`Server is running at http://0.0.0.0:${port}`);
    });

    server.on('close', () => {
      console.log('Server shutting down...');
    });
    
    return server; // Return the server instance
  }
}