import { IsEmpty, IsString } from "class-validator";

export class MediaValidator {
  @IsString()
  @IsEmpty()
  alt: string;
}