import { Body, Controller, Post } from '@nestjs/common';
import { CreateProductDto } from './dto/createProductDto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    await this.productsService.create(createProductDto);
    return { status: 'Product created successfully', statusCode: 201 };
  }
}
