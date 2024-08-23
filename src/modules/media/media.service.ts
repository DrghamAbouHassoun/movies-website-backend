import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Media } from "./media.entity";
import { In, Repository } from "typeorm";
import { IMediaCreate } from "src/types/media";
import * as path from "path";
import * as fs from 'fs'

@Injectable()
export class MediaService {
  constructor(@InjectRepository(Media) private mediaRepository: Repository<Media>) {};

  private readonly uploadPath = path.join(process.cwd(), '/uploads');

  async getAllMedia() {
    return await this.mediaRepository.find();
  }

  async saveFile(data: IMediaCreate) {
    try {
      console.log("Reached here", data)
      const media = this.mediaRepository.create({
        name: data.filename,
        fileType: data.type,
        alt: data.alt,
      });
      return await this.mediaRepository.save(media);
    } catch (error) {
      console.log(error);
      throw new HttpException({
        success: false,
        messages: ["Something went wrong"],
        data: [],
        status: 500,
        error,
      }, 200)
    }
  }

  async deleteMedia(id: string) {
    const media = await this.mediaRepository.findOneBy({ id: id });
    if (!media) {
      throw new HttpException({
        success: false,
        messages: ["Media not found"],
        data: [],
        status: 404,
      }, 200)
    }
    const filePath = path.join(this.uploadPath, media.name);

    // Check if the file exists
    console.log("FilePage: ", filePath);
    if (!fs.existsSync(filePath)) {
      throw new HttpException({
        success: false,
        messages: [`File ${media.name} not found`],
        status: 404,
        data: [],
      }, 200);
    }

    // Delete the file

    fs.unlinkSync(filePath);

    const deletedMedia = await this.mediaRepository.delete({ id: id })
    return deletedMedia;
  }

  async getMediaById(id: string) {
    const media = await this.mediaRepository.findOneBy({ id: id });
    if (!media) {
      throw new HttpException({
        success: false,
        messages: ["Media not found"],
        data: [],
        status: 404,
      }, 200);
    }
    return media;
  }

  async getMediaByName(name: string) {
    const media = await this.mediaRepository.findOneBy({ name: name });
    if (!media) {
      throw new HttpException({
        success: false,
        messages: ["Media not found"],
        data: [],
        status: 404,
      }, 200);
    }
    return media;
  }

  async getManyById(ids: string[]) {
    const media = await this.mediaRepository.find({ where: { id: In(ids) } })
    return media;
  }
}