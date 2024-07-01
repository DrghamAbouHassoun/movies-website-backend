import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterValidator, SignInValidator } from "src/validators/auth.validtor";


@Controller("/auth")
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post("/signin")
  async signIn(@Body() data: SignInValidator) {
    const token = await this.authService.signIn(data);
    return {
      success: true,
      messages: ["Signed in successfully"],
      data: token,
      status: 200
    }
  }

  @Post("/register")
  async register(@Body() data: RegisterValidator) {
    const token = await this.authService.register(data);
    return {
      success: true,
      messages: ["User registered successfully"],
      status: 201,
      data: token
    }
  }
}