import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entities/products.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from '../product/dto/createProductDto';
import { UpdateProductQuantityDto } from '../product/dto/updateProductQuantityDto';
import { UpdateNonQuantityProductDetailsDto } from '../product/dto/updateNonQuantityProductDetailsDto';
import { Category } from '../entities/categories.entity';
import { plainToInstance } from 'class-transformer';
import { GetProductDto } from '../product/dto/getProductDto';
import { OrderProductDto } from '../order/dto/orderProductDto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const category = await this.categoryRepository.findOne({
      where: { categoryId: createProductDto.categoryId },
    });
    if (!category) {
      throw new NotFoundException(
        'Cannot create product, category with that id does not exist',
      );
    }
    const newProduct = await this.productRepository.create(createProductDto);
    await this.productRepository.save(newProduct);
  }

  async getAll(options) {
    const allProducts = await this.productRepository.find(options);

    return plainToInstance(GetProductDto, allProducts, {
      excludeExtraneousValues: true,
    });
  }

  async getById(id: number) {
    const product = await this.productRepository.findOne({
      where: { id: id },
      relations: ['category'],
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return plainToInstance(GetProductDto, product, {
      excludeExtraneousValues: true,
    });
  }

  async updateNonQuantityProductInfo(
    id: number,
    updateNonQuantityProductDetailsDto: UpdateNonQuantityProductDetailsDto,
  ) {
    const category = await this.categoryRepository.findOne({
      where: { categoryId: updateNonQuantityProductDetailsDto.categoryId },
    });
    if (!category) {
      throw new NotFoundException(
        'Cannot update product, category with that id does not exist',
      );
    }
    await this.getById(id);
    return await this.productRepository.update(
      id,
      updateNonQuantityProductDetailsDto,
    );
  }

  async updateProductQuantityInfo(
    id: number,
    updateProductQuantityDto: UpdateProductQuantityDto,
  ) {
    await this.getById(id);
    return await this.productRepository.update(id, updateProductQuantityDto);
  }

  async delete(id: number) {
    await this.getById(id);
    await this.productRepository.delete(id);
  }

  async checkIfProductsExist(inputData: OrderProductDto[]) {
    for (const product of inputData) {
      const existingProduct = await this.productRepository.findOne({
        where: {
          id: product.productId,
        },
      });
      if (!existingProduct) {
        throw new NotFoundException(
          `Product with id ${product.productId} not found`,
        );
      }
      if (existingProduct.productQuantity < product.productQuantity) {
        throw new BadRequestException(
          `Inserted quantity amount for product with id ${product.productId} is not available`,
        );
      }
      if (existingProduct.productPrice != product.productPrice) {
        throw new ConflictException(`Wrong product price`);
      }
    }
  }
}
