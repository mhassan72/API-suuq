import { Request, Response } from 'express';
import User from '../model/User';
import WebToken from '../services/WebToken';
import bcrypt from 'bcrypt';

export default class AuthController  {

  constructor() {
    this.login = this.login.bind(this);
  }

  // Register a new user
  async register(req: Request, res: Response): Promise<void> {
    try {
      const { phone, secret, avatar_url } = req.body;
      
      // Validate required fields
      if (!phone || !secret || !avatar_url) {
        res.status(400).json({ error: 'All fields are required: phone, secret, avatar_url' });
        return;
      }

      const user = new User();

      // Check if the user already exists
      const existingUser = await user.findByPhone(phone);
      if (existingUser) {
        res.status(400).json({ error: 'User already exists' });
        return;
      }

      // Hash the user's secret (password)
      const hashedSecret = await bcrypt.hash(secret, 10);

      // Save the user
      const newUser = {
        phone,
        hashed_secret: hashedSecret,
        avatar_url,
      };

      await user.create(newUser);

      res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error: any) {
      res.status(500).json({ error: 'An error occurred while registering the user', details: error.message });
    }
  }

  // Log in an existing user
  async login(req: Request, res: Response): Promise<void> {
    try {      

      const { phone, secret } = req.body;

      // Validate required fields
      if (!phone || !secret) {
        res.status(400).json({ error: 'Phone and secret are required' });
        return;
      }

      const user = new User();

      // Find the user by phone
      const existingUser = await user.findByPhone(phone);
      if (!existingUser) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      // Compare secrets
      const isMatch = await bcrypt.compare(secret, existingUser.hashed_secret);
      if (!isMatch) {
        res.status(401).json({ error: 'Invalid credentials' });
        return;
      }

      // Generate a token
      const wt = new WebToken();
      const payload = { phone: existingUser.phone };
      const token = await wt.encode(payload, '24h'); // Token expires in 24 hours

      res.status(200).json({ 
        message: 'Login successful',
        user: {
          id: existingUser.id,
          phone: existingUser.phone,
          avatar_url: existingUser.avatar_url,
        },token });
    } catch (error: any) {
      res.status(500).json({ error: 'An error occurred while logging in', details: error.message });
    }
  }
}

export const auth = new AuthController() 