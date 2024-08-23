import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUserCreate } from 'src/types/user';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) { };

  async getAllUsers(): Promise<User[]> {
    try {
      const users = await this.userRepository.find({ select: { name: true, email: true, id: true, phone: true, role: true } });
      return users;
    } catch (error) {
      console.log(error);
      throw new HttpException({
        success: false,
        messages: ["Something went wrong"],
        data: [],
        status: 500,
        error,
      }, 200)
    }
  }

  async findUserByEmail(email: string) {
    try {
      const user = await this.userRepository.findOneBy({ email: email });
      if (!user) {
        throw new HttpException({
          success: false,
          messages: ["Email not found"],
          data: [],
          status: 404,
        }, 200);
      }
      return user;
    } catch (error) {
      console.log(error);
      throw new HttpException({
        success: false,
        messages: ["Something went wrong"],
        data: [],
        status: 500,
        error,
      }, 200)
    }
  }

  async findUserById(id: number) {
    try {
      const user = await this.userRepository.findOneBy({ id: id });
      if (!user) {
        throw new HttpException({
          success: false,
          messages: ["Email not found"],
          data: [],
          status: 404,
        }, 200);
      }
      return user;
    } catch (error) {
      console.log(error);
      throw new HttpException({
        success: false,
        messages: ["Something went wrong"],
        data: [],
        status: 500,
        error,
      }, 200)
    }
  }

  async createUserAccount(data: IUserCreate) {
    const isUserExist = await this.userRepository.findOneBy({ email: data.email.toLowerCase() });
    if (isUserExist) {
      throw new HttpException({
        success: false,
        messages: ["User already exists"],
        data: [],
        status: 409,
      }, 200);
    }
    const user = await this.userRepository.create({
      name: data.name,
      email: data.email.toLowerCase(),
      password: data.password,
      phone: data.phone,
      role: 'user',
    })
    return await this.userRepository.save(user);
  }
}