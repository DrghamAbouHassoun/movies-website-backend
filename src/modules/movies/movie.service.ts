import { Injectable, HttpException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Movie } from "src/schemas/movies.schema";
import { IMovieCreate } from "src/types/movie";

@Injectable()
export class MovieService {
  constructor(@InjectModel(Movie.name) private movieModel: Model<Movie>) { }

  async getMovies(): Promise<Movie[]> {
    try {
      const movies = await this.movieModel.find();
      return movies;
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

  async createMovie(data: IMovieCreate): Promise<Movie> {
    try {
      const movie = await this.movieModel.create(data);
      return movie;
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

  async getMovieById(id: string): Promise<Movie> {
    try {
      const movie = await this.movieModel.findById(id);
      if (!movie) {
        throw new HttpException({
          success: false,
          messages: ["Movie not found"],
          data: [],
          status: 404,
        }, 200)
      }
      return movie;
    } catch (error) {
      console.error(error);
      throw new HttpException({
        success: false,
        messages: ["Something went wrong"],
        data: [],
        status: 500,
        error,
      }, 200);
    }
  }

  async updateMovie(id: string, data: IMovieCreate) {
    try {
      const updatedMovie = await this.movieModel.findByIdAndUpdate(id, data);
      if (!updatedMovie) {
        throw new HttpException({
          success: false,
          messages: ["Movie not found"],
          data: [],
          status: 404,
        }, 200)
      }
      return updatedMovie;
    } catch (error) {
      console.error(error);
      throw new HttpException({
        success: false,
        messages: ["Something went wrong"],
        data: [],
        status: 500,
        error,
      }, 200);
    }
  }

  async deleteMovie(id: string) {
    try {
      const deletedMovie = await this.movieModel.findByIdAndDelete(id);
      if (!deletedMovie) {
        throw new HttpException({
          success: false,
          messages: ["Movie not found"],
          data: [],
          status: 404,
        }, 200)
      }
      return deletedMovie;
    } catch (error) {
      console.error(error);
      throw new HttpException({
        success: false,
        messages: ["Something went wrong"],
        data: [],
        status: 500,
        error,
      }, 200);
    }
  }
}