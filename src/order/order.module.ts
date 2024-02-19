import { Module } from '@nestjs/common';
import { OrderService } from '../order/order.service';
import { OrderController } from '../order/order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../entities/orders.entity';
import { Product } from '../entities/products.entity';
import { User } from '../entities/users.entity';
import { UserService } from '../user/user.service';
import { ProductService } from '../product/product.service';
import { Category } from '../entities/categories.entity';
import { OrderProduct } from '../entities/order_products.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, Product, User, Category, OrderProduct]),
  ],
  providers: [OrderService, UserService, ProductService],
  controllers: [OrderController],
})
export class OrderModule {}
