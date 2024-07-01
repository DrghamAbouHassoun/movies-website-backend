import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type ActorDocument = HydratedDocument<Actor>;

@Schema({ timestamps: true })
export class Actor {
    @Prop({ required: true, unique: true })
    name: string;

    @Prop({ default: Date.now() })
    birthdate: Date;

    @Prop({ })
    image?: string;

    @Prop()
    bio?: string;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Movie' }] })
    movies: string[];
}

export const ActorSchema = SchemaFactory.createForClass(Actor);