import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/createCategoryDto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    await this.categoriesService.create(createCategoryDto);
    return { status: 'Category created successfully', statusCode: 201 };
  }

  @Get()
  async getAllCategories() {
    return this.categoriesService.getAll();
  }

  @Get(':id')
  async getCategoryById(@Param('id') category_id: number) {
    const category = this.categoriesService.getById(category_id);

    return category;
  }

  @Put(':id')
  async updateCategoryById(
    @Param('id') category_id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    await this.categoriesService.update(category_id, updateCategoryDto);
    return { status: 'Category updated successfully', statusCode: 200 };
  }

  @Delete(':id')
  async deleteCategoryById(@Param('id') category_id: number) {
    await this.categoriesService.delete(category_id);
    return { status: 'Category deleted successfully', statusCode: 204 };
  }
}
