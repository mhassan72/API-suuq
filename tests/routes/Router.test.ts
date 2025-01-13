import express, { Request, Response } from 'express';
import request from 'supertest';
import { Router } from '../../src/routes/Router'; // Adjust the path as per your file structure

describe('Router', () => {
  let app: express.Express;

  beforeEach(() => {
    app = express();
    app.use(express.json()); // Enable JSON body parsing
  });

  it('should set up GET route correctly', async () => {
    const routes : any = [
      {
        path: '/test-get',
        method: 'get',
        handler: (req: Request, res: Response) => {
          res.status(200).json({ message: 'GET route works' });
        },
      },
    ];

    const router = new Router(routes);
    app.use(router.getRouter());

    const response = await request(app).get('/test-get');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('GET route works');
  });

  it('should set up POST route correctly', async () => {
    const routes :  any = [
      {
        path: '/test-post',
        method: 'post',
        handler: (req: Request, res: Response) => {
          res.status(201).json({ message: 'POST route works', body: req.body });
        },
      },
    ];

    const router = new Router(routes);
    app.use(router.getRouter());

    const response = await request(app).post('/test-post').send({ data: 'example' });
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('POST route works');
    expect(response.body.body).toEqual({ data: 'example' });
  });

  it('should set up PUT route correctly', async () => {
    const routes : any = [
      {
        path: '/test-put',
        method: 'put',
        handler: (req: Request, res: Response) => {
          res.status(200).json({ message: 'PUT route works', body: req.body });
        },
      },
    ];

    const router = new Router(routes);
    app.use(router.getRouter());

    const response = await request(app).put('/test-put').send({ data: 'updated' });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('PUT route works');
    expect(response.body.body).toEqual({ data: 'updated' });
  });

  it('should set up DELETE route correctly', async () => {
    const routes: any = [
      {
        path: '/test-delete',
        method: 'delete',
        handler: (req: Request, res: Response) => {
          res.status(204).send(); // No Content
        },
      },
    ];

    const router = new Router(routes);
    app.use(router.getRouter());

    const response = await request(app).delete('/test-delete');
    expect(response.status).toBe(204);
    expect(response.body).toEqual({});
  });

  it('should handle multiple routes correctly', async () => {
    const routes: any = [
      {
        path: '/route1',
        method: 'get',
        handler: (req: Request, res: Response) => {
          res.status(200).json({ message: 'Route 1' });
        },
      },
      {
        path: '/route2',
        method: 'post',
        handler: (req: Request, res: Response) => {
          res.status(201).json({ message: 'Route 2' });
        },
      },
    ];

    const router = new Router(routes);
    app.use(router.getRouter());

    const response1 = await request(app).get('/route1');
    expect(response1.status).toBe(200);
    expect(response1.body.message).toBe('Route 1');

    const response2 = await request(app).post('/route2');
    expect(response2.status).toBe(201);
    expect(response2.body.message).toBe('Route 2');
  });

  it('should return 404 for unregistered routes', async () => {
    const routes: any = [
      {
        path: '/only-route',
        method: 'get',
        handler: (req: Request, res: Response) => {
          res.status(200).json({ message: 'This is the only route' });
        },
      },
    ];

    const router = new Router(routes);
    app.use(router.getRouter());

    const response = await request(app).get('/not-registered');
    expect(response.status).toBe(404);
  });
});
