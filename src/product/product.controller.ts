import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateProductDto } from './dto/createProductDto';
import { UpdateProductQuantityDto } from './dto/updateProductQuantityDto';
import { UpdateNonQuantityProductDetailsDto } from './dto/updateNonQuantityProductDetailsDto';
import { ProductService } from './product.service';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(JwtGuard)
  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    await this.productService.create(createProductDto);
    return { status: 'Product created successfully', statusCode: 201 };
  }

  @Get()
  async getAllProducts() {
    return this.productService.getAll({ relations: ['category'] });
  }

  @Get(':id')
  async getProductById(@Param('id') id: number) {
    return this.productService.getById(id);
  }
  @UseGuards(JwtGuard)
  @Put(':id')
  async updateNonQuantityProductData(
    @Param('id') id: number,
    @Body()
    updateNonQuantityProductDetailsDto: UpdateNonQuantityProductDetailsDto,
  ) {
    await this.productService.updateNonQuantityProductInfo(
      id,
      updateNonQuantityProductDetailsDto,
    );
    return {
      status: 'Product`s non quantity info updated successfully',
      statusCode: 200,
    };
  }
  @UseGuards(JwtGuard)
  @Put('quantity/:id')
  async updateProductQuantity(
    @Param('id') id: number,
    @Body()
    updateProductQuantityDto: UpdateProductQuantityDto,
  ) {
    await this.productService.updateProductQuantityInfo(
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
    await this.productService.delete(id);
    return {
      status: 'Product deleted successfully',
      statusCode: 204,
    };
  }
}
