import { Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
  transform(value: any) {
    const oneMb = 10000;
    return value.size < oneMb;
  }
}