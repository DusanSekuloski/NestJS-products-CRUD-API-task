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
import { CreateOrderDto } from './dto/createOrderDto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(JwtGuard)
  @Post()
  async createOrder(
    @Body() createOrder: CreateOrderDto,
    @Req() req: RequestWithUser,
  ) {
    const user = req.user;
    await this.ordersService.create(createOrder, user.id);
    return { status: 'Order created successfully', statusCode: 201 };
  }
  @Get()
  async getAllOrders() {
    return this.ordersService.getAll({ relations: ['order_product'] });
  }
  @Get(':id')
  async getOrderById(@Param('id') id: number) {
    return this.ordersService.getById(id);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async deleteOrder(@Param('id') id: number) {
    const deletedOrder = await this.ordersService.deleteOrder(id);
    return {
      message: deletedOrder.message,
    };
  }
}
