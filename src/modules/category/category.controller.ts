import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CategoryValidator } from "src/validators/category.validator";

@Controller("/categories")
export class CategoryController {
  constructor(private categoryService: CategoryService) { }

  @Get("/")
  async getCategories() {
    const categories = await this.categoryService.getAllCategories();
    return {
      success: true,
      status: 200,
      messages: ["Fetched successfully"],
      data: categories,
    }
  }

  @Post("/")
  async createCategory(@Body() category: CategoryValidator) {
    const newCategory = await this.categoryService.createCategory(category);
    return {
      success: true,
      status: 200,
      messages: ["Created successfully"],
      data: newCategory,
    }
  }

  @Get("/:id")
  async getCategoryById(@Param("id") id: string) {
    const category = await this.getCategoryById(id);
    return {
      success: category ? true : false,
      status: category ? 200 : 404,
      messages: category ? ["Fetched successfully"] : ["Category not found"],
      data: category,
    }
  }

  @Put("/:id")
  async updateCategory(@Param("id") id: string, @Body() category: CategoryValidator) {
    const updatedCategory = await this.categoryService.updateCategory(id, category);
    return {
      success: true,
      status: 200,
      messages: ["Updated successfully"],
      data: updatedCategory,
    }
  }

  @Delete("/:id")
  async deleteCategory(@Param("id") id: string) {
    const deletedCategory = await this.categoryService.deleteCategory(id);
    return {
      success: true,
      status: 200,
      messages: ["Deleted successfully"],
      data: deletedCategory,
    }
  }
}