import { Body, Controller, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { ShowService } from "./show.service";
import { ShowValidator } from "src/validators/show.validator";


@Controller("/shows")
export class ShowController {
  constructor(
    private showService: ShowService,
  ) { }

  @Get("/")
  async getAllShows() {
    const shows = await this.showService.getAllShows();
    return {
      success: true,
      messages: ["Fetched successfully"],
      data: shows,
      status: 200,
    }
  }

  @Post("/")
  async addShow(@Body() data: ShowValidator) {
    const show = await this.showService.addNewShow(data);
    return {
      success: true,
      messages: ["Created Successfully"],
      data: show,
      status: 201,
    }
  }

  @Get("/:id")
  async getShowById(@Param("id", ParseIntPipe) id: number) {
    const show = await this.showService.getShowById(id);
    return {
      success: true,
      messages: ["Fetched successfully"],
      data: show,
      status: 200,
    }
  }

  @Put("/:id")
  async updateShow(@Param("id", ParseIntPipe) id: number, @Body() data: ShowValidator) {
    const updatedShow = await this.showService.updateShow(id, data);
    return {
      success: true,
      messages: ["Updated successfully"],
      data: updatedShow,
      status: 200,
    }
  }

  @Get("/:id/seasons")
  async getShowSeasons (@Param("id", ParseIntPipe) id: number) {
    const seasons = await this.showService.getSeasons(id);
    return {
      success: true,
      messages: ["Seasons fetched"],
      data: seasons,
      status: 200,
    }
  }
}