import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Show } from "./show.entity";
import { Repository } from "typeorm";
import { CategoryService } from "../category/category.service";
import { ActorService } from "../actor/actor.service";
import { ShowValidator } from "src/validators/show.validator";
import { SeasonService } from "../seasons/season.service";

@Injectable()
export class ShowService {
  constructor(
    @InjectRepository(Show) private showRepository: Repository<Show>,
    private categoryService: CategoryService,
    private actorService: ActorService,
    private seasonService: SeasonService,
  ) {}

  async getAllShows () {
    return await this.showRepository.find();
  }

  async addNewShow (data: ShowValidator) {
    const categories = await this.categoryService.findMultipleCategoriesByIds(data.categories.map(item => item))
    const actors = await this.actorService.findMultipleActorsByIds(data.actors.map(item => item));

    const show = this.showRepository.create({
      title: data.title,
      description: data.description,
      rate: data.rate,
      releaseDate: data.releaseDate,
      categories: categories,
      actors: actors,
    });
    return await this.showRepository.save(show);
  }

  async getShowById (id: number) {
    const show = await this.showRepository.findOneBy({ id: id });
    if (!show) {
      throw new HttpException({
        success: false,
        messages: ["Show may not found"],
        data: [],
        status: 404,
      }, 200)
    }
    return show;
  }

  async updateShow (id: number, data: ShowValidator) {
    const categories = await this.categoryService.findMultipleCategoriesByIds(data.categories.map(item => item))
    const actors = await this.actorService.findMultipleActorsByIds(data.actors.map(item => item));

    const showToUpdate = await this.showRepository.findOneBy({ id: id });
    if (!showToUpdate) {
      throw new HttpException({
        success: false,
        messages: ["Show may not found"],
        data: [],
        status: 404,
      }, 200)
    }
    const updatedShow = await this.showRepository.update({ id: id }, {...data, categories, actors });
    return updatedShow;
  }

  async getSeasons (showId: number) {
    const show = await this.showRepository.findOneBy({ id: showId })
    if (!show) {
      throw new HttpException({
        success: true,
        messages: ["Show is not found"],
        data: [],
        status: 404,
      }, 200)
    }
    const seasons = await this.seasonService.getShowSeasons(show.id);
    return seasons;
  }

}