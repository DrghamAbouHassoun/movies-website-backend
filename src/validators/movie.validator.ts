import { ArrayMinSize, IsArray, IsDateString, IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";

export class MovieValidator {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsDateString()
    releaseDate: Date;

    @IsArray()
    @IsNumber({}, { each: true })
    @ArrayMinSize(1)
    categories: number[];

    @IsArray()
    @IsNumber({}, { each: true })
    @ArrayMinSize(1)
    actors: number[];

    @IsNumber()
    @Min(1)
    @Max(10)
    rate: number;

    @IsString()
    trailer?: string;

    @IsString()
    movieUrl?: string;

    @IsNumber()
    duration?: number;

    @IsString()
    poster?: string;
}