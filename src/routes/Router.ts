import express, { Request, Response } from 'express';
// Define a structure for dynamic routes
import type { RouteConfig } from '../types'

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
      const middlewares = route.middleware || [];
      switch (route.method) {
        case 'get':
          this.router.get(route.path, ...middlewares, route.handler);
          break;
        case 'post':
          this.router.post(route.path, ...middlewares, route.handler);
          break;
        case 'put':
          this.router.put(route.path, ...middlewares, route.handler);
          break;
        case 'delete':
          this.router.delete(route.path, ...middlewares, route.handler);
          break;
      }
    });
  }

  public getRouter(): express.Router {
    return this.router;
  }
}
