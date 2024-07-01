
export interface IMovieCreate {
    title: string;
    description: string;
    categories: string[];
    actors: string[]
    rate: number;
    trailer?: string;
    poster?: string;
    movieUrl?: string;
    releaseDate: Date;
    duration?: number;
}