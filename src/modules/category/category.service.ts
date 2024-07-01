import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Category } from "src/schemas/category.schema";
import { ICategoryCreate } from "src/types/category";

@Injectable()
export class CategoryService {
  constructor(@InjectModel(Category.name) private categoryModel: Model<Category>) { }

  async getAllCategories(): Promise<Category[]> {
    try {
      return await this.categoryModel.find();
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

  async createCategory(category: ICategoryCreate) {
    try {
      const newCategory = await this.categoryModel.create(category);
      return newCategory;
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
      const category = await this.categoryModel.findById(id);
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

  async updateCategory(id: string, data: ICategoryCreate): Promise<Category> {
    try {
      const updatedCategory = await this.categoryModel.findByIdAndUpdate({
        _id: id,
      }, data)
      if (!updatedCategory) {
        throw new HttpException({
          success: false,
          messages: ["Category not found"],
          status: 404,
          data: [],
        }, 200)
      }
      return updatedCategory;
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

  async deleteCategory(id: string): Promise<Category> {
    try {
      const deletedCategory = await this.categoryModel.findByIdAndDelete(id);
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