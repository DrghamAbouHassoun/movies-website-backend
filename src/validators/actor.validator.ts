import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class ActorValidator {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    bio?: string;

    @IsDate()
    birthdate?: Date;
}