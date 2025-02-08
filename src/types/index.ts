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

export interface FavouriteItem {
  id?: string;
  userId: string;
  productId: string;
  createdAt: string;
}

export interface UploadResult {
  url: string;
  key: string;
  mimetype: string;
  size: number;
}

export interface UploadResult {
    originalname: string;  // Add this
    url: string;
    key: string;
    mimetype: string;
    size: number;
    error?: string;       // Optional error field
}
