import { IsEmpty, IsNumberString, IsOptional, IsString } from "class-validator";

export class MediaDto {
  @IsString()
  @IsEmpty()
  alt: string;
}

export class FindMediaDto {
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