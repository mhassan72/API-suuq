import bcrypt from 'bcrypt';
import User from '../model/User';
import TokenService from './TokenService';

export class AuthService {
  private userModel: User;
  private tokenService: TokenService;

  constructor() {
    this.userModel = new User();
    this.tokenService = new TokenService();
  }

  async registerUser(phone: string, secret: string, avatar_url: string) {
    const existingUser = await this.userModel.findByPhone(phone);
    if (existingUser) throw new Error('USER_EXISTS');

    const hashedSecret = await bcrypt.hash(secret, 10);
    return this.userModel.create({
      id: "",
      phone,
      hashed_secret: hashedSecret,
      avatar_url,
    });
  }

  async validateToken(token: string): Promise<boolean> {
    return this.tokenService.validateToken(token);
  }

  async authenticateUser(phone: string, secret: string) {
    const user = await this.userModel.findByPhone(phone);
    if (!user) throw new Error('USER_NOT_FOUND');

    const isMatch = await bcrypt.compare(secret, user.hashed_secret);
    if (!isMatch) throw new Error('INVALID_CREDENTIALS');

    const token = await this.tokenService.generateToken({ phone: user.phone }, '24h');
    return { user, token };
  }
}