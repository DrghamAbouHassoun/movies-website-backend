import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Actor, ActorSchema } from "src/schemas/actor.schema";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Actor.name, schema: ActorSchema }])
    ],
    controllers: [],
    providers: [],
    exports: [],
})
export class ActorModule {};