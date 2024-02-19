import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CategoryService } from '../category/category.service';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
} from '../category/dto/createCategoryDto';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    await this.categoryService.create(createCategoryDto);
    return { status: 'Category created successfully', statusCode: 201 };
  }

  @Get()
  async getAllCategories() {
    return this.categoryService.getAll();
  }

  @Get(':id')
  async getCategoryById(@Param('id') categoryId: number) {
    const category = this.categoryService.getById(categoryId);

    return category;
  }

  @Put(':id')
  async updateCategoryById(
    @Param('id') categoryId: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    await this.categoryService.update(categoryId, updateCategoryDto);
    return { status: 'Category updated successfully', statusCode: 200 };
  }

  @Delete(':id')
  async deleteCategoryById(@Param('id') categoryId: number) {
    await this.categoryService.delete(categoryId);
    return { status: 'Category deleted successfully', statusCode: 204 };
  }
}
