import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { IUserCreate } from 'src/types/user';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) { };

  async getAllUsers(): Promise<User[]> {
    try {
      const users = await this.userModel.find().select("name email mobile _id role");
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
      const user = await this.userModel.findOne({ email: email });
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
    try {
      const isUserExist = await this.userModel.findOne({ $or: [{ email: data.email.toLowerCase() }, { name: data.name }]});
      if (isUserExist) {
        throw new HttpException({
          success: false,
          messages: ["User already exists"],
          data: [],
          status: 409,
        }, 200);
      }
      const user = await this.userModel.create({
        name: data.name,
        email: data.email.toLowerCase(),
        password: data.password,
        mobile: data.mobile,
        role: 'customer',
      })
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
}