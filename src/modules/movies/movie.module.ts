import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Movie, MovieSchema } from "src/schemas/movies.schema";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema }]),
    ],
    controllers: [],
    providers: [],
    exports: [],
})
export class MovieModule {};