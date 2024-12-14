import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IActorCreate, IFetchActorsParams } from "src/types/actor";
import { Actor } from "./actor.entity";
import { ILike, In, Repository } from "typeorm";
import { MediaService } from "../media/media.service";

@Injectable()
export class ActorService {
  constructor(
    @InjectRepository(Actor) private actorRepository: Repository<Actor>,
    private mediaService: MediaService,
  ) { };

  async getAllActors({ search, page, limit }: IFetchActorsParams): Promise<[Actor[], number]> {
    try {
      const actSearch = search || "";
      const actPage = page ? page : 1;
      const actLimit = limit ? limit : 10;
      const [actors, count] = await this.actorRepository.findAndCount({
        where: [
          { name: ILike(`%${actSearch}%`) },
          { bio: ILike(`%${actSearch}%`) },
        ],
        relations: {
          image: true,
        },
        // select: { name: true, image: { name: true, id: true, alt: true }, bio: true, birthdate: true, updatedAt: true, createdAt: true  },
        take: actLimit,
        skip: (actPage - 1) * actLimit,
      })
      return [actors, count];
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
      let media = null;
      if (actor.imageId) {
        media = await this.mediaService.getMediaById(actor.imageId)
      }      
      const newActor = this.actorRepository.create({...actor, image: media || undefined });
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
      const actor = await this.actorRepository.findOne({ 
        where: { id: parseInt(id) },
        relations: { image: true },
      });
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
      let media = null;
      if (actor.imageId) {
        media = await this.mediaService.getMediaById(actor.imageId)
      }  
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
      updatedActor.image = media || undefined;
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