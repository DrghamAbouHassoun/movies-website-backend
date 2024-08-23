import { Injectable, HttpException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IMovieCreate } from "src/types/movie";
import { Repository } from "typeorm";
import { Movie } from "./movie.entity";
import { CategoryService } from "../category/category.service";
import { ActorService } from "../actor/actor.service";
import { MediaService } from "../media/media.service";
import { Media } from "../media/media.entity";

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie) private movieRepository: Repository<Movie>,
    private categoryService: CategoryService,
    private actorService: ActorService,
    private mediaService: MediaService,
  ) { }

  async getMovies(): Promise<Movie[]> {
    try {
      const movies = await this.movieRepository.find();
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
      const categories = await this.categoryService.findMultipleCategoriesByIds(data.categories.map(item => item))
      const actors = await this.actorService.findMultipleActorsByIds(data.actors.map(item => item));

      const trailer = data.trailer ? await this.mediaService.getMediaById(data.trailer) : undefined
      const poster = data.poster ? await this.mediaService.getMediaById(data.poster): undefined;
      const movieVideo = data.movieUrl ? await this.mediaService.getMediaById(data.movieUrl) : undefined;

      const movie = this.movieRepository.create({
        ...data,
        actors: actors,
        categories: categories,
        trailer: trailer,
        poster: poster,
        movieVideo: movieVideo,
      });
      return this.movieRepository.save(movie);
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

  async getMovieById(id: number): Promise<Movie> {
    try {
      const movie = await this.movieRepository.findOneBy({ id: id });
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

  async updateMovie(id: number, data: IMovieCreate) {
    try {
      const categories = await this.categoryService.findMultipleCategoriesByIds(data.categories.map(item => item))
      const actors = await this.actorService.findMultipleActorsByIds(data.actors.map(item => item));

      const trailer = data.trailer ? await this.mediaService.getMediaById(data.trailer) : undefined
      const poster = data.poster ? await this.mediaService.getMediaById(data.poster): undefined;
      const movieVideo = data.movieUrl ? await this.mediaService.getMediaById(data.movieUrl) : undefined;

      const updatedMovie = await this.movieRepository.findOneBy({ id: id });
      if (!updatedMovie) {
        throw new HttpException({
          success: false,
          messages: ["Movie not found"],
          data: [],
          status: 404,
        }, 200)
      }

      updatedMovie.title = data.title;
      updatedMovie.trailer = trailer;
      updatedMovie.description = data.description;
      updatedMovie.duration = data.duration;
      updatedMovie.movieVideo = movieVideo;
      updatedMovie.poster = poster;
      updatedMovie.rate = data.rate;
      updatedMovie.releaseDate = data.releaseDate;
      updatedMovie.actors = actors;
      updatedMovie.categories = categories;

      return await this.movieRepository.save(updatedMovie);
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
      const deletedMovie = await this.movieRepository.delete({ id: parseInt(id) });
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

  async updateMovieMedia (
    trailerId?: string, 
    posterId?: string, 
    movieVideoId?: string
  ): Promise<{
    trailer: Media | undefined; 
    poster: Media | undefined; 
    movieVideo: Media | undefined
  }> {
    const trailer = await this.mediaService.getMediaById(trailerId);
    const poster = await this.mediaService.getMediaById(posterId);
    const movieVideo = await this.mediaService.getMediaById(movieVideoId)

    return { trailer, poster, movieVideo };
  }

  async addTrailer (movieId: number, trailerId: string) {
    const movie = await this.movieRepository.findOneBy({ id: movieId });
    const trailer = await this.mediaService.getMediaById(trailerId);
    movie.trailer = trailer;
    return await this.movieRepository.save(movie);
  }

  async addPoster (movieId: number, posterId: string) {
    const movie = await this.movieRepository.findOneBy({ id: movieId });
    const poster = await this.mediaService.getMediaById(posterId);
    movie.poster = poster;
    return await this.movieRepository.save(movie);
  }

  async addMovieVideo (movieId: number, movieVideoId: string) {
    const movie = await this.movieRepository.findOneBy({ id: movieId });
    const movieVideo = await this.mediaService.getMediaById(movieVideoId);
    movie.movieVideo = movieVideo;
    return await this.movieRepository.save(movie);
  }

  // async fetchMoviesByCategoryId(categoryId: number) {
  //   this.movieRepository.findOneBy({ categories})
  // }
}