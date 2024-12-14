
export interface IActorCreate {
    name: string;
    bio?: string;
    imageId?: string;
    birthdate: Date;
}

export interface IFetchActorsParams {
    search?: string;
    page?: number;
    limit?: number;
}