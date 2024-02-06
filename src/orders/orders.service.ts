import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/entities/orders.entity';
import { DataSource, In, Repository } from 'typeorm';
import { Users } from 'src/entities/users.entity';
import { Products } from 'src/entities/products.entity';
import { ProductsService } from 'src/products/products.service';
import { OrderProduct } from 'src/entities/order_product.entity';
import { plainToInstance } from 'class-transformer';
import { GetOrderDto } from './dto/getOrderDto';
import { ProductToOrderDto } from './dto/productToOrderDto';

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

  async create(dto: ProductToOrderDto, userId: number) {
    const queryRunner = this.dataSource.createQueryRunner();
    const productIds = dto.product_id;
    const products = await this.productsService.getById(productIds);
    if (products.length !== productIds.length) {
      throw new NotFoundException('Some products listed do not exist');
    }
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
      throw error;
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
  async getById(id: number[]) {
    const order = await this.ordersRepository.find({
      where: { order_id: In(id) },
      relations: ['order_product'],
    });

    if (order.length < 1) {
      throw new NotFoundException('Order not found');
    }

    return plainToInstance(GetOrderDto, order, {
      excludeExtraneousValues: false,
    });
  }
  async addProductToExistingOrder(dto: ProductToOrderDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    const productIds = dto.product_id;
    const orderId = dto.order_id;

    const products = await this.productsService.getById(productIds);
    if (products.length !== productIds.length) {
      throw new NotFoundException('Some products listed do not exist');
    }
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      for (let i = 0; i < productIds.length; i++) {
        const orderProduct = new OrderProduct({
          product_id: productIds[i],
          order_id: orderId,
        });
        await this.orderProductRepository.save(orderProduct);
      }
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
  async deleteProductFromOrder(dto: ProductToOrderDto) {
    const { order_id, product_id } = dto;
    const orderProducts = await this.orderProductRepository.find({
      where: { order_id, product_id: In(product_id) },
    });
    if (orderProducts.length < 1) {
      throw new NotFoundException('Product not found in the order');
    }
    if (orderProducts.length !== product_id.length) {
      throw new NotFoundException(
        'Some listed products do not exist in the order',
      );
    }
    await this.orderProductRepository.remove(orderProducts);
    return {
      message: `Product with id ${product_id} deleted from order ${order_id}`,
    };
  }
  async deleteOrder(dto: ProductToOrderDto) {
    const { order_id } = dto;
    const order = await this.orderProductRepository.find({
      where: { order_id },
    });
    if (order.length < 1) {
      throw new NotFoundException(`Order with id ${order_id} does not exist`);
    }
    await this.orderProductRepository.remove(order);
    return {
      message: `Order with id ${order_id} is deleted`,
    };
  }
}
