import { Request, Response } from 'express';
import { AuthService } from '../services/AuthService';
import  { AuthValidation }  from '../middlewares/AuthValidation';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
    // Bind methods to maintain 'this' context
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
    this.validateToken = this.validateToken.bind(this);
  }

  async validateToken(req: Request, res: Response): Promise<void> {
    try {
      const { token } = req.body;
      
      if (!token) {
        res.status(400).json({ isValid: false, error: 'Token is required' });
        return;
      }

      const isValid = await this.authService.validateToken(token);
      res.status(200).json({ isValid });
    } catch (error) {
      res.status(401).json({ 
        isValid: false,
        error: 'Invalid token format'
      });
    }
  }

  async register(req: Request, res: Response): Promise<void> {
    try {
      const { phone, secret, avatar_url } = req.body;
      const user = await this.authService.registerUser(phone, secret, avatar_url);
      
      res.status(201).json({ 
        message: 'User registered successfully', 
        user: {
          id: user.id,
          phone: user.phone,
          avatar_url: user.avatar_url
        }
      });
    } catch (error: any) {
      const status = error.message === 'USER_EXISTS' ? 409 : 500;
      const message = error.message === 'USER_EXISTS' 
        ? 'User already exists' 
        : 'Registration failed';

      res.status(status).json({ error: message });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { phone, secret } = req.body;
      const { user, token } = await this.authService.authenticateUser(phone, secret);
      
      res.status(200).json({
        message: 'Login successful',
        user: {
          id: user.id,
          phone: user.phone,
          avatar_url: user.avatar_url,
        },
        token
      });
    } catch (error: any) {
      const status = this.getErrorStatus(error.message);
      res.status(status).json({ 
        error: this.getErrorMessage(error.message) 
      });
    }
  }

  // Private helper methods
  private getErrorStatus(errorCode: string): number {
    const statusMap: Record<string, number> = {
      'USER_NOT_FOUND': 404,
      'INVALID_CREDENTIALS': 401
    };
    return statusMap[errorCode] || 500;
  }

  private getErrorMessage(errorCode: string): string {
    const messageMap: Record<string, string> = {
      'USER_NOT_FOUND': 'User not found',
      'INVALID_CREDENTIALS': 'Invalid credentials'
    };
    return messageMap[errorCode] || 'Authentication failed';
  }
}

export const authController = new AuthController();