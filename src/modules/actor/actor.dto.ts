import { IsDateString, IsNotEmpty, IsNumberString, IsOptional, IsString } from "class-validator";

export class ActorDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    bio?: string;

    @IsString()
    @IsDateString()
    birthdate?: Date;

    @IsString()
    @IsOptional()
    imageId?: string;
}

export class FindActorsDto {
    @IsOptional()
    @IsString()
    search?: string;

    @IsOptional()
    @IsNumberString()
    page?: number;

    @IsOptional()
    @IsNumberString()
    limit?: number;
}