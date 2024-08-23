import { Module } from "@nestjs/common";
// import { MongooseModule } from "@nestjs/mongoose";
// import { User, UserSchema } from "src/schemas/user.schema";
import { UserService } from "./user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";

@Module({
    imports: [
        // MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        TypeOrmModule.forFeature([User])
    ],
    controllers: [],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule {};