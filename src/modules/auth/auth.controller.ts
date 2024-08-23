import { Body, Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterValidator, SignInValidator } from "src/validators/auth.validtor";
import { AuthGuard } from "src/guards/auth.guard";


@Controller("/auth")
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post("/login")
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

  @UseGuards(AuthGuard)
  @Get("/profile")
  async profile(@Request() req) {
    const user = await this.authService.profile(req.user.id);
    return {
      success: true,
      messages: ["Profile fetched"],
      data: user,
      status: 200,
    }
  }
}