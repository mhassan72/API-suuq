import { Request, Response, NextFunction } from 'express';

export class AuthValidation {
  static registerFields(req: Request, res: Response, next: NextFunction): void {
    const { phone, secret, avatar_url } = req.body;
    if (!phone || !secret || !avatar_url) {
      res.status(400).json({ error: 'All fields are required: phone, secret, avatar_url' });
      return;
    }
    next();
  }

  static loginFields(req: Request, res: Response, next: NextFunction): void {
    const { phone, secret } = req.body;
    if (!phone || !secret) {
      res.status(400).json({ error: 'Phone and secret are required' });
      return;
    }
    next();
  }
}