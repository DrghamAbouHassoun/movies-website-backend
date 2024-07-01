import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type MovieDocument = HydratedDocument<Movie>;

@Schema({ timestamps: true })
export class Movie {
    @Prop({ required: true, unique: true })
    title: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    releaseDate: Date;

    @Prop({ type: [Types.ObjectId], ref: "Category" })
    categories: string[];

    @Prop({ type: [Types.ObjectId], ref: "Actor" })
    actors: string[];

    @Prop({ type: String })
    director?: string[];

    @Prop({ max: 10, min: 1, default: 1 })
    rate: number;

    @Prop({ type: String })
    trailer?: string;

    @Prop({ type: String })
    movieUrl?: string;

    @Prop({ type: Number, default: 0, min: 0 })
    duration?: number;

    @Prop({ type: String })
    poster?: string;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);