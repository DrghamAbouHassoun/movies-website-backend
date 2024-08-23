import { HttpException, Injectable } from "@nestjs/common";
import { UserService } from "../users/user.service";
import * as bcrypt from 'bcrypt';
import { IUserCreate } from "src/types/user";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private usersService: UserService,
    private jwtService: JwtService,
  ) { }

  public salt = bcrypt.genSaltSync()

  async signIn({ email, password }: { email: string, password: string }) {
    const user = await this.usersService.findUserByEmail(email);
    console.log("User: ", user)
    console.log("Password, email: ", password, user.password);
    console.log("Result: ", bcrypt.compareSync(password, user.password));
    if (!bcrypt.compareSync(password, user.password)) {
      throw new HttpException({
        success: false,
        messages: ["Invalid email or password"],
        data: [],
        status: 401,
      }, 200);
    }
 
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    }
    const jwtSecret = this.configService.get<string>('JWT_SECRET')
    return {
      access_token: await this.jwtService.signAsync(payload, { secret: jwtSecret }),
    }
  }

  async register(data: IUserCreate) {
    const hashedPassword = await bcrypt.hash(data.password, this.salt);
    const newUser = await this.usersService.createUserAccount({ ...data, password: hashedPassword });

    const payload = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      role: newUser.role,
    }
    const jwtSecret = this.configService.get<string>('JWT_SECRET')
    return {
      access_token: await this.jwtService.signAsync(payload, { secret: jwtSecret }),
    }
  }

  async profile(userId: number) {
    this.usersService.findUserById(userId);
  }
}