import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ICategoryCreate } from "src/types/category";
import { In, Repository } from "typeorm";
import { Category } from "./category.entity";

@Injectable()
export class CategoryService {
  constructor(@InjectRepository(Category) private categoryRepository: Repository<Category>) { }

  async getAllCategories(): Promise<Category[]> {
    try {
      return await this.categoryRepository.find();
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
      const newCategory = await this.categoryRepository.create(category);
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
      const category = await this.categoryRepository.findOneBy({ id: parseInt(id) });
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
      category.image = data.image;
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