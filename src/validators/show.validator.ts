import { ArrayMinSize, IsArray, IsDateString, IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";

export class ShowValidator {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description: string;

  @IsDateString()
  releaseDate: Date;

  @IsString()
  director?: string;

  @IsNumber()
  @Min(0)
  @Max(10)
  rate: number;


  @IsArray()
  @IsNumber({}, { each: true })
  @ArrayMinSize(1)
  categories: number[];

  @IsArray()
  @IsNumber({}, { each: true })
  @ArrayMinSize(1)
  actors: number[];
}