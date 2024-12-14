import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { ActorService } from "./actor.service";
import { ActorDto, FindActorsDto } from "./actor.dto";

@Controller("/actors")
export class ActorController {
  constructor(private actorService: ActorService) { }

  @Get()
  async getAllActors(@Query() findActorsQuery: FindActorsDto) {
    const [actors, count] = await this.actorService.getAllActors(findActorsQuery);
    return {
      success: true,
      messages: ["Actors fetched successfully"],
      data: actors,
      metaData: {
        count
      },
      status: 200,
    }
  }

  @Post()
  async addActor(@Body() data: ActorDto) {
    const actor = await this.actorService.addActor({ 
      name: data.name, 
      bio: data.bio, 
      birthdate: data.birthdate,
      imageId: data.imageId,
    });
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
  async updateActor(@Param("id") id: string, @Body() actor: ActorDto) {
    const updatedActor = await this.actorService.updateActor(id, { 
      name: actor.name, 
      bio: actor.bio, 
      birthdate: actor.birthdate,
      imageId: actor.imageId,
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