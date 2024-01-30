import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from 'src/entities/products.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/createProductDto';
import { UpdateProductQuantityDto } from './dto/updateProductQuantityDto';
import { UpdateNonQuantityProductDetailsDto } from './dto/updateNonQuantityProductDetailsDto';
import { Categories } from 'src/entities/categories.entity';

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

  async getAll() {
    return await this.productsRepository.find();
  }

  async getById(id: number) {
    const product = await this.productsRepository.findOne({
      where: { id: id },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async updateNonQuantityProductInfo(
    id: number,
    updateNonQuantityProductDetailsDto: UpdateNonQuantityProductDetailsDto,
  ) {
    const product = await this.productsRepository.findOne({
      where: { id: id },
    });
    const category = await this.categoriesRepository.findOne({
      where: { category_id: updateNonQuantityProductDetailsDto.category_id },
    });
    if (!category) {
      throw new NotFoundException(
        'Cannot update product, category with that id does not exist',
      );
    } else if (!product) {
      throw new NotFoundException(
        'Cannot update product, product with that id does not exist',
      );
    }
    return await this.productsRepository.update(
      id,
      updateNonQuantityProductDetailsDto,
    );
  }

  async updateProductQuantityInfo(
    id: number,
    updateProductQuantityDto: UpdateProductQuantityDto,
  ) {
    const product = await this.productsRepository.findOne({
      where: { id: id },
    });
    if (!product) {
      throw new NotFoundException(
        'Cannot update product, product with that id does not exist',
      );
    }
    return await this.productsRepository.update(id, updateProductQuantityDto);
  }

  async delete(id: number) {
    const product = await this.productsRepository.findOne({
      where: { id: id },
    });
    if (!product) {
      throw new NotFoundException(
        'Cannot delete product, product with that id does not exist',
      );
    }
    await this.productsRepository.delete(id);
  }
}
