import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  CreateProductDto,
  UpdateNonQuantityProductDetailsDto,
  UpdateProductQuantityDto,
} from './dto/productsDto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    await this.productsService.create(createProductDto);
    return { status: 'Product created successfully', statusCode: 201 };
  }

  @Get()
  async getAllProducts() {
    return this.productsService.getAll();
  }

  @Get(':id')
  async getProductById(@Param('id') id: number) {
    return this.productsService.getById(id);
  }

  @Put(':id')
  async updateNonQuantityProductData(
    @Param('id') id: number,
    @Body()
    updateNonQuantityProductDetailsDto: UpdateNonQuantityProductDetailsDto,
  ) {
    await this.productsService.updateNonQuantityProductInfo(
      id,
      updateNonQuantityProductDetailsDto,
    );
    return {
      status: 'Product`s non quantity info updated successfully',
      statusCode: 200,
    };
  }

  @Put('quantity/:id')
  async updateProductQuantity(
    @Param('id') id: number,
    @Body()
    updateProductQuantityDto: UpdateProductQuantityDto,
  ) {
    await this.productsService.updateProductQuantityInfo(
      id,
      updateProductQuantityDto,
    );
    return {
      status: 'Product quantity info updated successfully',
      statusCode: 200,
    };
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: number) {
    await this.productsService.delete(id);
    return {
      status: 'Product deleted successfully',
      statusCode: 204,
    };
  }
}
