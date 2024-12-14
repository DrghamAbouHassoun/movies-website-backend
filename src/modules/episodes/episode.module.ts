import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Episode } from "./episode.entity";
import { EpisodeService } from "./episode.service";
import { ShowModule } from "../shows/show.module";
import { SeasonModule } from "../seasons/seasons.module";
import { MediaModule } from "../media/media.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Episode]),
    ShowModule,
    SeasonModule,
    MediaModule,
  ],
  controllers: [],
  providers: [EpisodeService],
  exports: [],
})
export class EpisodeModule {}