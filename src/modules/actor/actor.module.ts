import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Actor } from "./actor.entity";
import { ActorController } from "./actor.controller";
import { ActorService } from "./actor.service";
import { Movie } from "../movies/movie.entity";
// import { MongooseModule } from "@nestjs/mongoose";
// import { Actor, ActorSchema } from "src/schemas/actor.schema";

@Module({
    imports: [
        // MongooseModule.forFeature([{ name: Actor.name, schema: ActorSchema }])
        TypeOrmModule.forFeature([Actor, Movie])
    ],
    controllers: [ActorController],
    providers: [ActorService],
    exports: [ActorService],
})
export class ActorModule {};