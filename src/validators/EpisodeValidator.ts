import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class EpisodeValidator {
  @IsNumber()
  @IsNotEmpty()
  index: number;

  @IsString()
  title?: string;

  @IsString()
  description?: string;

  @IsNumber()
  @IsNotEmpty()
  seasonId: number;

  @IsNumber()
  @IsNotEmpty()
  showId: number;

  @IsString()
  trailerId?: string;

  @IsString()
  episodeVideo: string
}