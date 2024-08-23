import { IsDateString, IsEmpty, IsNotEmpty, IsString } from "class-validator";

export class ActorValidator {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    bio?: string;

    @IsString()
    @IsDateString()
    birthdate?: Date;

    @IsString()
    @IsEmpty()
    image?: string;
}