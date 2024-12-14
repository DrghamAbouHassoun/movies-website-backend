import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ICategoryCreate, IFetchCategoriesParams } from "src/types/category";
import { ILike, In, Repository } from "typeorm";
import { Category } from "./category.entity";
import { MediaService } from "../media/media.service";

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) private categoryRepository: Repository<Category>,
    private mediaService: MediaService,
  ) { }

  async getAllCategories({ search, page, limit }: IFetchCategoriesParams): Promise<[Category[], number]> {
    try {
      const actSearch = search || "";
      const actPage = page ? page : 1;
      const actLimit = limit ? limit : 10;
      return await this.categoryRepository.findAndCount({
        where: [
          { name: ILike(`%${actSearch}%`) },
          { description: ILike(`%${actSearch}%`) },
        ],
        relations: {
          image: true,
        },
        take: actLimit,
        skip: (actPage - 1) * actLimit,
      })
    } catch (error) {
      console.error(error);
      throw new HttpException({
        success: false,
        messages: ["Something went wrong"],
        status: 500,
        data: [],
        error,
      }, 200)
    }

  }

  async findMultipleCategoriesByIds(ids: number[]) {
    try {
      const categories = await this.categoryRepository.find({ where: { id: In(ids) }})
      return categories;
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

  async createCategory(category: ICategoryCreate) {
    try {
      let media = null;
      if (category.imageId) {
        media = await this.mediaService.getMediaById(category.imageId)
      }
      const newCategory = await this.categoryRepository.create({...category, image: media || null });
      return await this.categoryRepository.save(newCategory);
    } catch (error) {
      console.error(error);
      throw new HttpException({
        success: false,
        messages: ["Something went wrong"],
        status: 500,
        data: [],
        error,
      }, 200)
    }
    
  }

  async getCategoryById(id: string): Promise<Category> {
    try {
      const category = await this.categoryRepository.findOne({ 
        where: { id: parseInt(id) },
        relations: { image: true },
      });
      if (!category) {
        throw new HttpException("Category not found", 404)
      }
      return category;
    } catch (error) {
      console.error(error);
      throw new HttpException({
        success: false,
        messages: ["Something went wrong"],
        status: 500,
        data: [],
        error,
      }, 200)
    }
  }

  async updateCategory(id: string, data: ICategoryCreate) {
    try {
      let media = null;
      if (data.imageId) {
        media = await this.mediaService.getMediaById(data.imageId)
      }
      const category = await this.categoryRepository.findOneBy({ id: parseInt(id) });
      if (!category) {
        throw new HttpException({
          success: false,
          messages: ["Category not found"],
          status: 404,
          data: [],
        }, 200)
      }
      category.name = data.name;
      category.description = data.description;
      category.image = media || null;
      const result = await this.categoryRepository.save(category);
      
      return result;
    } catch (error) {
      console.error(error);
      throw new HttpException({
        success: false,
        messages: ["Something went wrong"],
        status: 500,
        data: [],
        error,
      }, 200)
    }
  }

  async deleteCategory(id: string) {
    try {
      const deletedCategory = await this.categoryRepository.delete(id);
      if (!deletedCategory) {
        throw new HttpException({
          success: false,
          messages: ["Category not found"],
          status: 404,
          data: [],
        }, 200)
      }
      return deletedCategory;
    } catch (error) {
      console.error(error);
      throw new HttpException({
        success: false,
        messages: ["Something went wrong"],
        status: 500,
        data: [],
        error,
      }, 200)
    }
  }
}