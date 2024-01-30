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
import { ProductsService } from './products.service';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(JwtGuard)
  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    await this.productsService.create(createProductDto);
    return { status: 'Product created successfully', statusCode: 201 };
  }
  @UseGuards(JwtGuard)
  @Get()
  async getAllProducts() {
    return this.productsService.getAll();
  }

  @Get(':id')
  async getProductById(@Param('id') id: number) {
    return this.productsService.getById(id);
  }
  @UseGuards(JwtGuard)
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
  @UseGuards(JwtGuard)
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
