import { ArrayMinSize, IsArray, IsDate, IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";

export class MovieValidator {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsDate()
    releaseDate: Date;

    @IsArray()
    @IsString({ each: true })
    @ArrayMinSize(1)
    categories: string[];

    @IsArray()
    @IsString({ each: true })
    @ArrayMinSize(1)
    actors: string[];

    @IsNumber()
    @Min(1)
    @Max(10)
    rate: number;

    @IsString()
    trailer?: string;

    @IsString()
    movieUrl?: string;

    @IsString()
    duration?: number;

    @IsString()
    poster?: string;
}