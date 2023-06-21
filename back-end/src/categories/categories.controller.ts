import { Body, Controller, Delete, Get, Post, UseGuards, Param, Put } from "@nestjs/common";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { CategoriesService } from "./categories.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller("categories")
export class CategoriesController {
  constructor(private categoryService: CategoriesService) {}
  
  @UseGuards(JwtAuthGuard)
  @Post()
  createCategory(@Body() dto: CreateCategoryDto) {
    return this.categoryService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  updateCategory(@Param() params:any, @Body() dto: CreateCategoryDto) {
    return this.categoryService.update(params.id, dto);
  }
  

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  deleteCategory(@Param() params:any) {
    return this.categoryService.delete(params.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  GetAllCategory() {
    return this.categoryService.getAll();
  }
}


