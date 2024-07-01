import { HttpException, Injectable } from "@nestjs/common";
import { UserService } from "../users/user.service";
import * as bcrypt from 'bcrypt';
import { IUserCreate } from "src/types/user";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) { }

  async signIn({ email, password }: { email: string, password: string }) {
    try {
      const user = await this.usersService.findUserByEmail(email);
      if (!await bcrypt.compare(user.password, password)) {
        throw new HttpException({
          success: false,
          messages: ["Invalid email or password"],
          data: [],
          status: 401,
        }, 200);
      }
      
      const payload = {
        _id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        role: user.role,
      }
      return {
        access_token: await this.jwtService.signAsync(payload),
      }
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

  async register (data: IUserCreate) {
    try {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      const newUser = await this.usersService.createUserAccount({...data, password: hashedPassword });
      
      const payload = {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        mobile: newUser.mobile,
        role: newUser.role,
      }
      return {
        access_token: await this.jwtService.signAsync(payload),
      }
    } catch (error) {
      console.log(error);
      throw new HttpException({
        success: false,
        messages: ["Something went wrong 2"],
        data: [],
        status: 500,
        error,
      }, 200)
    }
  }
}