import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from 'src/entities/products.entity';
import { In, Repository } from 'typeorm';
import { CreateProductDto } from './dto/createProductDto';
import { UpdateProductQuantityDto } from './dto/updateProductQuantityDto';
import { UpdateNonQuantityProductDetailsDto } from './dto/updateNonQuantityProductDetailsDto';
import { Categories } from 'src/entities/categories.entity';
import { plainToInstance } from 'class-transformer';
import { GetProductDto } from './dto/getProductDto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
    @InjectRepository(Categories)
    private readonly categoriesRepository: Repository<Categories>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const category = await this.categoriesRepository.findOne({
      where: { category_id: createProductDto.category_id },
    });
    if (!category) {
      throw new NotFoundException(
        'Cannot create product, category with that id does not exist',
      );
    }
    const newProduct = await this.productsRepository.create(createProductDto);
    await this.productsRepository.save(newProduct);
  }

  async getAll(options) {
    const allProducts = await this.productsRepository.find(options);

    return plainToInstance(GetProductDto, allProducts, {
      excludeExtraneousValues: true,
    });
  }

  async getById(id: number[]) {
    const product = await this.productsRepository.find({
      where: { id: In(id) },
      relations: ['category'],
    });

    if (product.length < 1) {
      throw new NotFoundException('Product not found');
    }

    return plainToInstance(GetProductDto, product, {
      excludeExtraneousValues: true,
    });
  }

  async updateNonQuantityProductInfo(
    id: number[],
    updateNonQuantityProductDetailsDto: UpdateNonQuantityProductDetailsDto,
  ) {
    const category = await this.categoriesRepository.findOne({
      where: { category_id: updateNonQuantityProductDetailsDto.category_id },
    });
    if (!category) {
      throw new NotFoundException(
        'Cannot update product, category with that id does not exist',
      );
    }
    await this.getById(id);
    return await this.productsRepository.update(
      id,
      updateNonQuantityProductDetailsDto,
    );
  }

  async updateProductQuantityInfo(
    id: number[],
    updateProductQuantityDto: UpdateProductQuantityDto,
  ) {
    await this.getById(id);
    return await this.productsRepository.update(id, updateProductQuantityDto);
  }

  async delete(id: number[]) {
    await this.getById(id);
    await this.productsRepository.delete(id);
  }
}
