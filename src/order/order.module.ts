import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/entities/orders.entity';
import { Product } from 'src/entities/products.entity';
import { User } from 'src/entities/users.entity';
import { UsersService } from 'src/users/users.service';
import { ProductsService } from 'src/products/products.service';
import { Category } from 'src/entities/categories.entity';
import { OrderProduct } from 'src/entities/order_product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, Product, User, Category, OrderProduct]),
  ],
  providers: [OrderService, UsersService, ProductsService],
  controllers: [OrderController],
})
export class OrdersModule {}
