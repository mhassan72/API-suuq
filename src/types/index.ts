import { Request, Response, NextFunction } from 'express';

export interface RouteConfig {
  path: string;
  method: 'get' | 'post' | 'put' | 'delete';
  handler: (req: Request, res: Response, next: NextFunction) => void;
  middleware?: Array<(req: Request, res: Response, next: NextFunction) => void>; // Optional middleware
}

export interface Translation{
  so: string;
  en: string;
}