import { Request, Response, NextFunction } from 'express';
import WebToken from '../services/WebToken'; // Make sure this path is correct
import { i8 } from '../language/so'
export async function authenticateRequest(req: Request, res: Response, next: NextFunction): Promise<void> {
  const token = req.headers['authorization'];

  if (!token) {
    res.status(401).json({ error: i8.find(t => t.en === "Authorization token is required")?.so });
    return;
  }

  try {
    const jw = new WebToken();
    const isValid = await jw.validate(token);

    if (!isValid) {
      res.status(401).json({ error: i8.find(t => t.en === "Invalid or expired token")?.so });
      return;
    }

    // If token is valid, pass control to the next middleware/route handler
    next();
  } catch (error: any) {
    res.status(500).json({ error: i8.find(t => t.en === "Authentication failed")?.so, details: error.message });
  }
}
