import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Movie } from "./movie.entity";
import { CategoryModule } from "../category/category.module";
import { ActorModule } from "../actor/actor.module";
import { Actor } from "../actor/actor.entity";
import { Category } from "../category/category.entity";
import { MovieController } from "./movie.controller";
import { MovieService } from "./movie.service";
import { MediaModule } from "../media/media.module";
// import { MongooseModule } from "@nestjs/mongoose";
// import { Movie, MovieSchema } from "src/schemas/movies.schema";

@Module({
    imports: [
        // MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema }]),
        TypeOrmModule.forFeature([Movie, Actor, Category]),
        CategoryModule,
        ActorModule,
        MediaModule,
    ],
    controllers: [MovieController],
    providers: [MovieService],
    exports: [],
})
export class MovieModule {};