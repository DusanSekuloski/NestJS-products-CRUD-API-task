import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/entities/orders.entity';
import { Products } from 'src/entities/products.entity';
import { Users } from 'src/entities/users.entity';
import { UsersService } from 'src/users/users.service';
import { ProductsService } from 'src/products/products.service';
import { Categories } from 'src/entities/categories.entity';
import { OrderProduct } from 'src/entities/order_product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Order,
      Products,
      Users,
      Categories,
      OrderProduct,
    ]),
  ],
  providers: [OrdersService, UsersService, ProductsService],
  controllers: [OrdersController],
})
export class OrdersModule {}
