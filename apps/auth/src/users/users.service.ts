import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import { User } from './users.schema';
import * as bcrypt from 'bcrypt';
import { Types } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.usersRepository.findOne({
      email: createUserDto.email,
    });

    if (user) throw new UnprocessableEntityException('User already exists');

    return await this.usersRepository.create({
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    });
  }

  async getUsers(): Promise<User[]> {
    return await this.usersRepository.find({});
  }

  async getUser(id: Types.ObjectId): Promise<User> {
    return await this.usersRepository.findOne({ _id: id });
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      email,
    });

    if (!user) throw new UnprocessableEntityException('User not found');

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid)
      throw new UnprocessableEntityException('Invalid password');

    return user;
  }
}
