import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { RequestWithUser } from 'interfaces/userRequest.interface';
import { ProductToOrderDto } from './dto/productToOrderDto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(JwtGuard)
  @Post()
  async createOrder(
    @Body() dto: ProductToOrderDto,
    @Req() req: RequestWithUser,
  ) {
    const user = req.user;
    await this.ordersService.create(dto, user.id);
    return { status: 'Order created successfully', statusCode: 201 };
  }
  @Get()
  async getAllOrders() {
    return this.ordersService.getAll({ relations: ['order_product'] });
  }
  @Get(':id')
  async getOrderById(@Param('id') id: number[]) {
    return this.ordersService.getById(id);
  }
  @Post(':id/add/product')
  async addProductToExistingOrder(
    @Param('id') id: number,
    @Body() dto: ProductToOrderDto,
  ) {
    dto.order_id = id;
    const addedProduct =
      await this.ordersService.addProductToExistingOrder(dto);
    return {
      statusCode: 201,
      message: `Added product with id ${dto.product_id} to order ${id}`,
      addedProduct,
    };
  }
  @Delete(':id/delete/product')
  async deleteProductFromOrder(
    @Param('id') id: number,
    @Body() dto: ProductToOrderDto,
  ) {
    dto.order_id = id;
    const deletedProducts =
      await this.ordersService.deleteProductFromOrder(dto);
    return {
      message: deletedProducts.message,
    };
  }
  @Delete('delete/:id')
  async deleteOrder(@Param('id') id: number, @Body() dto: ProductToOrderDto) {
    dto.order_id = id;
    const deletedOrder = await this.ordersService.deleteOrder(dto);
    return {
      message: deletedOrder.message,
    };
  }
}
