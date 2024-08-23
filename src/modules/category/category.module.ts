import { Module } from "@nestjs/common";
// import { MongooseModule } from "@nestjs/mongoose";
// import { Category, CategorySchema } from "src/schemas/category.schema";
import { CategoryController } from "./category.controller";
import { CategoryService } from "./category.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "./category.entity";
import { Movie } from "../movies/movie.entity";

@Module({
    imports: [
        // MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }]),
        TypeOrmModule.forFeature([Category, Movie]),
    ],
    controllers: [CategoryController],
    providers: [CategoryService],
    exports: [CategoryService],
})
export class CategoryModule {}