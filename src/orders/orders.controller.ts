import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CreateOrderDto } from './dto/createOrderDto';
import { OrdersService } from './orders.service';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { RequestWithUser } from 'interfaces/userRequest.interface';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(JwtGuard)
  @Post()
  async createOrder(
    @Body() createOrderDto: CreateOrderDto,
    @Req() req: RequestWithUser,
  ) {
    const user = req.user;
    await this.ordersService.create(createOrderDto, user.id);
    return { status: 'Order created successfully', statusCode: 201 };
  }
  @Get()
  async getAllOrders() {
    return this.ordersService.getAll({ relations: ['order_product'] });
  }
}
