import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IActorCreate } from "src/types/actor";
import { Actor } from "./actor.entity";
import { In, Repository } from "typeorm";

@Injectable()
export class ActorService {
  constructor(@InjectRepository(Actor) private actorRepository: Repository<Actor>) { };

  async getAllActors(): Promise<Actor[]> {
    try {
      const actors = await this.actorRepository.find();
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

  async findMultipleActorsByIds(ids: number[]) {
    try {
      const actors = await this.actorRepository.find({ where: { id: In(ids) }})
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
      const newActor = this.actorRepository.create(actor);
      return await this.actorRepository.save(newActor);
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
      const actor = await this.actorRepository.findOneBy({ id: parseInt(id) });
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
      const updatedActor = await this.actorRepository.findOneBy({id: parseInt(id)});
      if (!updatedActor) {
        throw new HttpException({
          success: false,
          messages: ["Actor not found"],
          data: [],
          status: 404,
        }, 200)
      }
      updatedActor.name = actor.name;
      updatedActor.bio = actor.bio;
      updatedActor.birthdate = actor.birthdate;
      updatedActor.image = actor.image;
      return this.actorRepository.save(updatedActor);
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
      const deletedActor =await this.actorRepository.delete({ id: parseInt(id) });
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