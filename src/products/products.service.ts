import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from 'src/entities/products.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/createProductDto';

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
}
