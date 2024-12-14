
export interface ICategoryCreate {
    name: string;
    description: string;
    imageId?: string;
}

export interface IFetchCategoriesParams {
    search?: string;
    page?: number;
    limit?: number;
}