import { Body, Controller, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { SeasonValidator } from "src/validators/season.validator";
import { SeasonService } from "./season.service";

@Controller("/seasons")
export class SeasonController {
  constructor(
    private seasonService: SeasonService,
  ) {}

  @Post("/")
  async addSeason (@Body() data: SeasonValidator) {
    const season = await this.seasonService.addSeasonToShow(data);
    return {
      success: true,
      messages: ["Created successfully"],
      data: season,
      status: 201,
    }
  }

  @Put("/:id")
  async updateSeason (@Param("id", ParseIntPipe) id: number, @Body() data: SeasonValidator) {
    const season = await this.updateSeason(id, data);
    return {
      success: true,
      messages: ["Updated successfully"],
      data: season,
      status: 200,
    }
  }
}