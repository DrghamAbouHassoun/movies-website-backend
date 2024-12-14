import { Category } from "src/modules/category/category.entity";
import { Actor } from "src/schemas/actor.schema";

export interface IShowCreate {
  title: string;
  description: string;
  releaseDate: Date;
  categories: Category[];
  actors: Actor[];
  director: string;
  rate: number;
}