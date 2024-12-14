import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Episode } from "./episode.entity";
import { Repository } from "typeorm";
import { EpisodeValidator } from "src/validators/EpisodeValidator";
import { ShowService } from "../shows/show.service";
import { SeasonService } from "../seasons/season.service";
import { MediaService } from "../media/media.service";

@Injectable()
export class EpisodeService {
  constructor(
    @InjectRepository(Episode) private episodeRepository: Repository<Episode>,
    private showService: ShowService,
    private seasonService: SeasonService,
    private mediaService: MediaService,
  ) {}

  async getShowEpisodes (showId: number) {
    const episodes = await this.episodeRepository.findBy({ show: { id: showId } });
    return episodes;
  }

  async getSeasonEpisodes (seasonId: number) {
    const episodes = await this.episodeRepository.findBy({ season: { id: seasonId } });
    return episodes;
  }

  async addNewEpisode (data: EpisodeValidator) {
    const show = await this.showService.getShowById(data.showId);
    const season = await this.seasonService.getSeasonById(data.seasonId);
    const trailer = await this.mediaService.getMediaById(data.trailerId);
    const episodeVideo = await this.mediaService.getMediaById(data.episodeVideo);

    const episode = this.episodeRepository.create({
      title: data.title,
      description: data.description,
      index: data.index,
      show: show,
      season: season,
      trailer,
      episodeVideo,
    })
    return await this.episodeRepository.save(episode);
  }
};