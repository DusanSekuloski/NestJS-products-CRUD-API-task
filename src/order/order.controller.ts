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
import { OrderService } from '../order/order.service';
import { JwtGuard } from '../auth/guards/jwt-auth.guard';
import { RequestWithUser } from '../common/interfaces/userRequest.interface';
import { CreateOrderDto } from '../order/dto/createOrderDto';
import { OrderProductDto } from '../order/dto/orderProductDto';
import { UpdateOrderStatusDto } from '../order/dto/updateOrderStatusDto';

@Controller('orders')
export class OrderController {
  constructor(private readonly ordersService: OrderService) {}

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
    dto.orderId = id;
    const updatedOrderStatus = await this.ordersService.updateOrderStatus(dto);
    return {
      statusCode: 200,
      message: updatedOrderStatus.message,
    };
  }
  @Delete('delete/:id')
  async deleteOrder(@Param('id') id: number, @Body() dto: OrderProductDto) {
    dto.orderId = id;
    const deletedOrder = await this.ordersService.deleteOrder(dto);
    return {
      message: deletedOrder.message,
    };
  }
}
