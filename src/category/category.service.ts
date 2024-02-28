import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../entities/categories.entity';
import { Repository } from 'typeorm';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
} from '../category/dto/createCategoryDto';
import { plainToInstance } from 'class-transformer';
import { GetCategoryDto } from '../category/dto/getCategoryDto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const categoryName =
      await this.categoryRepository.create(createCategoryDto);
    await this.categoryRepository.save(categoryName);
  }

  async getAll() {
    return await this.categoryRepository.find();
  }

  async getById(categoryId: number) {
    const category = await this.categoryRepository.findOne({
      where: { categoryId: categoryId },
      relations: ['products'],
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return plainToInstance(GetCategoryDto, category, {
      excludeExtraneousValues: false,
    });
  }

  async update(categoryId: number, updateCategoryDto: UpdateCategoryDto) {
    await this.getById(categoryId);
    return await this.categoryRepository.update(categoryId, updateCategoryDto);
  }

  async delete(categoryId: number) {
    await this.getById(categoryId);
    await this.categoryRepository.delete(categoryId);
  }
}
