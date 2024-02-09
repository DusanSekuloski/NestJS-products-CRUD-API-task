import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/entities/orders.entity';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { Users } from 'src/entities/users.entity';
import { Products } from 'src/entities/products.entity';
import { ProductsService } from 'src/products/products.service';
import { OrderProduct } from 'src/entities/order_product.entity';
import { plainToInstance } from 'class-transformer';
import { GetOrderDto } from './dto/getOrderDto';
import { CreateOrderDto } from './dto/createOrderDto';

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
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async create(
    createOrderDto: CreateOrderDto,
    userId: number,
  ): Promise<GetOrderDto> {
    await this.productsService.checkIfProductsExist(
      createOrderDto.order_products,
    );
    let totalAmount: number = 0;
    createOrderDto.order_products.forEach((product) => {
      totalAmount += product.product_price * product.product_quantity;
    });
    const order = {
      user_id: userId,
      order_product: createOrderDto.order_products,
      total_amount: totalAmount,
    };
    const savedOrder = await this.entityManager.transaction(() => {
      const createdOrder = this.ordersRepository.create(order);
      return this.ordersRepository.save(createdOrder);
    });
    return plainToInstance(GetOrderDto, savedOrder, {
      excludeExtraneousValues: false,
    });
  }
  // async create(dto: ProductToOrderDto, userId: number) {
  //   const queryRunner = this.dataSource.createQueryRunner();
  //   const productIds = dto.product_id;
  //   const products = await this.productsService.getById(productIds);
  //   if (products.length !== productIds.length) {
  //     throw new NotFoundException('Some products listed do not exist');
  //   }
  //   await queryRunner.connect();
  //   await queryRunner.startTransaction();
  //   try {
  //     const order = new Order({
  //       user_id: userId,
  //     });

  //     await this.ordersRepository.save(order);

  //     for (let i = 0; i < productIds.length; i++) {
  //       const orderProduct = new OrderProduct({
  //         product_id: productIds[i],
  //         order_id: order.order_id,
  //       });

  //       await this.orderProductRepository.save(orderProduct);
  //     }
  //     await queryRunner.commitTransaction();
  //   } catch (error) {
  //     await queryRunner.rollbackTransaction();
  //     throw error;
  //   } finally {
  //     await queryRunner.release();
  //   }
  // }

  async getAll(options) {
    const allOrders = await this.ordersRepository.find(options);

    return plainToInstance(GetOrderDto, allOrders, {
      excludeExtraneousValues: false,
    });
  }

  async getById(id: number) {
    const order = await this.ordersRepository.findOne({
      where: { order_id: id },
      relations: ['order_product'],
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return plainToInstance(GetOrderDto, order, {
      excludeExtraneousValues: false,
    });
  }

  async getOrderProductsByOrderId(orderId: number): Promise<OrderProduct[]> {
    const orderProducts = await this.orderProductRepository.find({
      where: {
        order_id: orderId,
      },
    });
    if (!orderProducts) {
      throw new NotFoundException(
        `Order products not found by order id ${orderId}`,
      );
    }
    return orderProducts;
  }

  async deleteOrder(id: number) {
    const order = await this.ordersRepository.find({
      where: { order_id: id },
    });
    if (!order) {
      throw new NotFoundException(`Order with id ${id} does not exist`);
    }
    await this.ordersRepository.remove(order);
    return {
      message: `Order with id ${id} is deleted`,
    };
  }
}
