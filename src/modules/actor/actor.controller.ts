import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ActorService } from "./actor.service";
import { ActorValidator } from "src/validators/actor.validator";

@Controller("/actors")
export class ActorController {
  constructor(private actorService: ActorService) { }

  @Get()
  async getAllActors() {
    const actors = await this.actorService.getAllActors();
    return {
      success: true,
      messages: ["Actors fetched successfully"],
      data: actors,
      status: 200,
    }
  }

  @Post()
  async addActor(@Body() data: ActorValidator) {
    const actor = await this.actorService.addActor({ name: data.name, image: data.image, bio: data.bio, birthdate: data.birthdate });
    return {
      success: true,
      messages: ["Actor added successfully"],
      data: actor,
      status: 201,
    }
  }

  @Get("/:id")
  async getActorById(@Param("id") id: string) {
    const actor = await this.actorService.getActorById(id);
    return {
      success: true,
      messages: ["Actor fetched successfully"],
      data: actor,
      status: 200,
    }
  }

  @Put("/:id")
  async updateActor(@Param("id") id: string, @Body() actor: ActorValidator) {
    const updatedActor = await this.actorService.updateActor(id, { 
      name: actor.name, 
      image: actor.image, 
      bio: actor.bio, 
      birthdate: actor.birthdate 
    });
    return {
      success: true,
      messages: ["Actor updated successfully"],
      data: updatedActor,
      status: 200,
    }
  }

  @Delete("/:id")
  async deleteActor(@Param("id") id: string) {
    const deletedActor = await this.actorService.deleteActor(id);
    return {
      success: true,
      messages: ["Actor deleted successfully"],
      data: deletedActor,
      status: 200,
    }
  }
}