import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
    
    @Prop({ required: true, unique: true })
    name: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true })
    mobile: string;

    @Prop({ required: true }) // Customer or Subscriper
    role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);