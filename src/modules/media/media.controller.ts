import { Body, Controller, Delete, Get, Param, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { MediaService } from "./media.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";

@Controller("/media")
export class MediaController {
  constructor(private mediaService: MediaService) {}

  @Get("/")
  async getAllMedia () {
    const media = await this.mediaService.getAllMedia();
    return {
      success: true,
      messages: [],
      data: media,
      status: 200,
    }
  }

  @Post("/upload")
  @UseInterceptors(FileInterceptor("file", {
    storage: diskStorage({
      destination: "./uploads",
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;
        callback(null, filename);
      }
    })
  }))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { alt: string }, 
  ) {
    const uploadedFile = await this.mediaService.saveFile({
      filename: file.filename,
      type: file.mimetype.split("/")[0],
      alt: body.alt
    })
    return {
      success: true,
      messages: ["Uploaded successfully"],
      data: uploadedFile,
      status: 201,
    }
  }

  @Delete("/:id")
  async removeMedia (@Param("id") id: string) {
    return await this.mediaService.deleteMedia(id);
  }
}