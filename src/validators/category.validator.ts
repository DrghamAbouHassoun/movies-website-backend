import { IsNotEmpty, IsString } from "class-validator";

export class CategoryValidator {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    image: string;
}