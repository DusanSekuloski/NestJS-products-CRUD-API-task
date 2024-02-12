import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { RequestWithUser } from 'src/common/interfaces/userRequest.interface';
import { CreateOrderDto } from './dto/createOrderDto';
import { OrderProductDto } from './dto/orderProductDto';
import { UpdateOrderStatusDto } from './dto/updateOrderStatusDto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(JwtGuard)
  @Post()
  async createOrder(@Body() dto: CreateOrderDto, @Req() req: RequestWithUser) {
    const user = req.user;
    await this.ordersService.create(dto, user.id);
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
  @Put(':id/update/status')
  async updateOrderStatus(
    @Param('id') id: number,
    @Body() dto: UpdateOrderStatusDto,
  ) {
    dto.order_id = id;
    const updatedOrderStatus = await this.ordersService.updateOrderStatus(dto);
    return {
      statusCode: 200,
      message: updatedOrderStatus.message,
    };
  }
  @Delete('delete/:id')
  async deleteOrder(@Param('id') id: number, @Body() dto: OrderProductDto) {
    dto.order_id = id;
    const deletedOrder = await this.ordersService.deleteOrder(dto);
    return {
      message: deletedOrder.message,
    };
  }
}
