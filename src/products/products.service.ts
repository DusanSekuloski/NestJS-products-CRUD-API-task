import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from 'src/entities/products.entity';
import { Repository } from 'typeorm';
import {
  CreateProductDto,
  UpdateNonQuantityProductDetailsDto,
  UpdateProductQuantityDto,
} from './dto/productsDto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const newProduct = await this.productsRepository.create(createProductDto);
    await this.productsRepository.save(newProduct);
  }

  async getAll() {
    return await this.productsRepository.find();
  }

  async getById(id: number) {
    return await this.productsRepository.findOne({
      where: { id: id },
    });
  }

  async updateNonQuantityProductInfo(
    id: number,
    updateNonQuantityProductDetailsDto: UpdateNonQuantityProductDetailsDto,
  ) {
    return await this.productsRepository.update(
      id,
      updateNonQuantityProductDetailsDto,
    );
  }

  async updateProductQuantityInfo(
    id: number,
    updateProductQuantityDto: UpdateProductQuantityDto,
  ) {
    return await this.productsRepository.update(id, updateProductQuantityDto);
  }

  async delete(id: number) {
    await this.productsRepository.delete(id);
  }
}
