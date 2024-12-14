import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Season } from "./season.entity";
import { Show } from "../shows/show.entity";
import { SeasonService } from "./season.service";
import { SeasonController } from "./season.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([Season, Show]),
  ],
  controllers: [SeasonController],
  providers: [SeasonService],
  exports: [SeasonService],
})
export class SeasonModule {}