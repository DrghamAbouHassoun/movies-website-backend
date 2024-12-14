import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Season } from "./season.entity";
import { Repository } from "typeorm";
import { ISeasonCreate } from "src/types/season";

@Injectable()
export class SeasonService {
  constructor(
    @InjectRepository(Season) private seasonRepository: Repository<Season>
  ) {}

  async getShowSeasons (showId: number) {
    const seasons = await this.seasonRepository.findBy({ show: { id: showId } });
    return seasons;
  }

  async addSeasonToShow (data: ISeasonCreate) {
    const season = this.seasonRepository.create({
      show: { id: data.showId },
      title: data.title,
      description: data.description,
      index: data.index
    })
    return await this.seasonRepository.save(season);
  }

  async getSeasonById (id: number) {
    const season = await this.seasonRepository.findOneBy({ id: id });
    if (!season) {
      throw new HttpException({
        success: false,
        messages: ["Season not found"],
        data: [],
        status: 404,
      }, 200)
    }
    return season;
  }
}