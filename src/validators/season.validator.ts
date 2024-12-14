import { IsDateString, IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class SeasonValidator {
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  index: number;

  @IsString()
  title?: string;

  @IsString()
  description?: string;

  @IsDateString()
  releaseDate: Date;

  @IsNumber()
  @IsNotEmpty()
  showId: number;
}