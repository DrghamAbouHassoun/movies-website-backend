import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Actor } from "src/schemas/actor.schema";
import { IActorCreate } from "src/types/actor";

@Injectable()
export class ActorService {
  constructor(@InjectModel(Actor.name) private actorModel: Model<Actor>) { };

  async getAllActors(): Promise<Actor[]> {
    try {
      const actors = await this.actorModel.find();
      return actors;
    } catch (error) {
      console.error(error);
      throw new HttpException({
        success: false,
        messages: ["Something went wrong"],
        data: [],
        status: 500,
        error,
      }, 200)
    }
  }

  async addActor (actor: IActorCreate): Promise<Actor> {
    try {
      const newActor = await this.actorModel.create(actor);
      return newActor;
    } catch (error) {
      console.log(error);
      throw new HttpException({
        success: false,
        messages: ["Something went wrong"],
        data: [],
        status: 500,
        error,
      }, 200)
    }
  }

  async getActorById (id: string) {
    try {
      const actor = await this.actorModel.findById(id);
      if (!actor) {
        throw new HttpException({
          success: false,
          messages: ["Actor not found"],
          data: [],
          status: 404,
        }, 200)
      }
      return actor;
    } catch (error) {
      console.error(error);
      throw new HttpException({
        success: false,
        messages: ["Something went wrong"],
        data: [],
        status: 500,
        error,
      }, 200)
    }
  }

  async updateActor (id: string, actor: IActorCreate) {
    try {
      const updatedActor = await this.actorModel.findByIdAndUpdate(id, actor);
      if (!updatedActor) {
        throw new HttpException({
          success: false,
          messages: ["Actor not found"],
          data: [],
          status: 404,
        }, 200)
      }
      return updatedActor;
    } catch (error) {
      console.error(error);
      throw new HttpException({
        success: false,
        messages: ["Something went wrong"],
        data: [],
        status: 500,
        error,
      }, 200)
    }
  }

  async deleteActor (id: string) {
    try {
      const deletedActor =await this.actorModel.findByIdAndDelete(id);
      if (!deletedActor) {
        throw new HttpException({
          success: false,
          messages: ["Actor not found"],
          data: [],
          status: 404,
        }, 200)
      }
      return deletedActor
    } catch (error) {
      console.error(error);
      throw new HttpException({
        success: false,
        messages: ["Something went wrong"],
        data: [],
        status: 500,
        error,
      }, 200)
    }
  }
}