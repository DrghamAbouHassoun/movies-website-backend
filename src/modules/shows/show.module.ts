import { Module } from "@nestjs/common";
import { ShowController } from "./show.controller";
import { ShowService } from "./show.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Show } from "./show.entity";
import { Actor } from "../actor/actor.entity";
import { Category } from "../category/category.entity";
import { Season } from "../seasons/season.entity";
import { Episode } from "../episodes/episode.entity";
import { CategoryModule } from "../category/category.module";
import { ActorModule } from "../actor/actor.module";
import { SeasonModule } from "../seasons/seasons.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Show, Actor, Category, Season, Episode]),
    CategoryModule,
    ActorModule,
    SeasonModule,
  ],
  controllers: [ShowController],
  providers: [ShowService],
  exports: [ShowService],
})
export class ShowModule {}