import express, { Request, Response } from 'express';

// Define a structure for dynamic routes
interface RouteConfig {
  path: string;
  method: 'get' | 'post' | 'put' | 'delete';
  handler: (req: Request, res: Response) => void;
}

export class Router {
  private router: express.Router;
  private routes: RouteConfig[];

  constructor(routes: RouteConfig[]) {
    this.router = express.Router();
    this.routes = routes;
    this.setUpRoutes();
  }

  private setUpRoutes(): void {
    // Loop through the routes array and dynamically create routes
    this.routes.forEach(route => {
      switch (route.method) {
        case 'get':
          this.router.get(route.path, route.handler);
          break;
        case 'post':
          this.router.post(route.path, route.handler);
          break;
        case 'put':
          this.router.put(route.path, route.handler);
          break;
        case 'delete':
          this.router.delete(route.path, route.handler);
          break;
      }
    });
  }

  public getRouter(): express.Router {
    return this.router;
  }
}
