import { Module } from "@nestjs/common";
import { UserModule } from "../users/user.module";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { ConfigModule } from "@nestjs/config";

@Module({
    imports: [
        ConfigModule,
        JwtModule.register({
            global: true,
            signOptions: { expiresIn: "1h" },
        }),
        UserModule,
    ],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService],
})
export class AuthModule { }