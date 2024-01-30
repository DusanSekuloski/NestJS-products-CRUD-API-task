import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from 'src/entities/categories.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/createCategoryDto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Categories)
    private readonly categoriesRepository: Repository<Categories>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const categoryName =
      await this.categoriesRepository.create(createCategoryDto);
    await this.categoriesRepository.save(categoryName);
  }

  async getAll() {
    return await this.categoriesRepository.find();
  }

  async getById(category_id: number) {
    const category = await this.categoriesRepository.findOne({
      where: { category_id: category_id },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  async update(category_id: number, updateCategoryDto: UpdateCategoryDto) {
    await this.getById(category_id);
    return await this.categoriesRepository.update(
      category_id,
      updateCategoryDto,
    );
  }

  async delete(category_id: number) {
    await this.getById(category_id);
    await this.categoriesRepository.delete(category_id);
  }
}
