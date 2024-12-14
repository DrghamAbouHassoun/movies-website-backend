import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CategoryDto, FindCategoriesDto } from "./category.dto";

@Controller("/categories")
export class CategoryController {
  constructor(private categoryService: CategoryService) { }

  @Get("/")
  async getCategories(@Query() findCategoriesQuery: FindCategoriesDto) {
    const [categories, categoriesCount] = await this.categoryService.getAllCategories({ 
      search: findCategoriesQuery.search,
      page: findCategoriesQuery.page,
      limit: findCategoriesQuery.limit,
    });
    return {
      success: true,
      status: 200,
      messages: ["Fetched successfully"],
      data: categories,
      metaData: {
        count: categoriesCount,
      }
    }
  }

  @Post("/")
  async createCategory(@Body() category: CategoryDto) {
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
    const category = await this.categoryService.getCategoryById(id);
    return {
      success: category ? true : false,
      status: category ? 200 : 404,
      messages: category ? ["Fetched successfully"] : ["Category not found"],
      data: category,
    }
  }

  @Put("/:id")
  async updateCategory(@Param("id") id: string, @Body() category: CategoryDto) {
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