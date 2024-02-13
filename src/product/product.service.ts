import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/products.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/createProductDto';
import { UpdateProductQuantityDto } from './dto/updateProductQuantityDto';
import { UpdateNonQuantityProductDetailsDto } from './dto/updateNonQuantityProductDetailsDto';
import { Category } from 'src/entities/categories.entity';
import { plainToInstance } from 'class-transformer';
import { GetProductDto } from './dto/getProductDto';
import { OrderProductDto } from 'src/order/dto/orderProductDto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const category = await this.categoriesRepository.findOne({
      where: { categoryId: createProductDto.categoryId },
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

  async getById(id: number) {
    const product = await this.productsRepository.findOne({
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
    const category = await this.categoriesRepository.findOne({
      where: { categoryId: updateNonQuantityProductDetailsDto.categoryId },
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
    id: number,
    updateProductQuantityDto: UpdateProductQuantityDto,
  ) {
    await this.getById(id);
    return await this.productsRepository.update(id, updateProductQuantityDto);
  }

  async delete(id: number) {
    await this.getById(id);
    await this.productsRepository.delete(id);
  }

  async checkIfProductsExist(inputData: OrderProductDto[]) {
    for (const product of inputData) {
      const existingProduct = await this.productsRepository.findOne({
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
