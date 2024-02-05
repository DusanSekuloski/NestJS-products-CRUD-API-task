import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/entities/orders.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateOrderDto } from './dto/createOrderDto';
import { Users } from 'src/entities/users.entity';
import { Products } from 'src/entities/products.entity';
import { ProductsService } from 'src/products/products.service';
import { OrderProduct } from 'src/entities/order_product.entity';
import { plainToInstance } from 'class-transformer';
import { GetOrderDto } from './dto/getOrderDto';

@Injectable()
export class OrdersService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
    @InjectRepository(Users)
    private readonly productsRepository: Repository<Products>,
    @InjectRepository(OrderProduct)
    private readonly orderProductRepository: Repository<OrderProduct>,
    private readonly productsService: ProductsService,
  ) {}

  async create(createOrderDto: CreateOrderDto, userId: number) {
    const queryRunner = this.dataSource.createQueryRunner();
    const productIds = createOrderDto.product_id;
    await this.productsService.checkIfProductsExist(productIds);
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const order = new Order({
        user_id: userId,
      });

      await this.ordersRepository.save(order);

      for (let i = 0; i < productIds.length; i++) {
        const orderProduct = new OrderProduct({
          product_id: productIds[i],
          order_id: order.order_id,
        });

        await this.orderProductRepository.save(orderProduct);
      }
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async getAll(options) {
    const allOrders = await this.ordersRepository.find(options);

    return plainToInstance(GetOrderDto, allOrders, {
      excludeExtraneousValues: false,
    });
  }
}
