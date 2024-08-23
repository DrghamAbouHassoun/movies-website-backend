
export interface IMovieCreate {
    title: string;
    description: string;
    categories: number[];
    actors: number[]
    rate: number;
    trailer?: string;
    poster?: string;
    movieUrl?: string;
    releaseDate: Date;
    duration?: number;
}