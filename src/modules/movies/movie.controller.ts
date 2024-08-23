import { Body, Controller, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { MovieService } from "./movie.service";
import { MovieValidator } from "src/validators/movie.validator";

@Controller("/movies")
export class MovieController {
  constructor(private movieService: MovieService) { }

  @Get("/")
  async getAllMovies() {
    const movies = await this.movieService.getMovies();
    return {
      succes: true,
      messages: ["Movies fetched successfully"],
      data: movies,
      status: 200,
    }
  }

  @Post("/")
  async addMovie(@Body() data: MovieValidator) {
    const movie = await this.movieService.createMovie(data);
    return {
      success: true,
      messages: ["Movie created successfully"],
      data: movie,
      status: 201,
    }
  }

  @Get("/:id")
  async getMovieById(@Param("id", ParseIntPipe) id: number) {
    const movie = await this.movieService.getMovieById(id);
    return {
      success: true,
      messages: ["Movie fetched successfully"],
      data: movie,
      status: 200,
    }
  }

  @Put("/:id")
  async updateMovie(@Param("id", ParseIntPipe) id: number, @Body() data: MovieValidator) {
    const updatedMovie = await this.movieService.updateMovie(id, data)
    return {
      success: true,
      messages: ["Movie updated successfully"],
      data: updatedMovie,
      status: 200,
    }
  }
}