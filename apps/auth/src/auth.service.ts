import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Types } from 'mongoose';
import { User } from './users/users.schema';
import { UsersService } from './users/users.service';

export interface JwtPayload {
  userId: Types.ObjectId;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  getHello(): string {
    return `Hello from ${AuthService.name}!`;
  }

  async login(user: User): Promise<string> {
    const token = this.jwtService.sign({ userId: user._id });
    return token;
  }

  async validateUser({ userId }: JwtPayload): Promise<User | null> {
    return await this.usersService.getUser(userId);
  }
}
