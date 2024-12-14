export interface IMediaCreate {
  filename: string;
  type: string;
  alt?: string;
}

export interface IFetchMediaParams {
  search?: string;
  page?: number;
  limit?: number;
}