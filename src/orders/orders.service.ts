import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/entities/orders.entity';
import { EntityManager, Repository } from 'typeorm';
import { ProductsService } from 'src/products/products.service';
import { OrderProduct } from 'src/entities/order_product.entity';
import { plainToInstance } from 'class-transformer';
import { GetOrderDto } from './dto/getOrderDto';
import { CreateOrderDto } from './dto/createOrderDto';
import { OrderProductDto } from './dto/orderProductDto';
import { UpdateOrderStatusDto } from './dto/updateOrderStatusDto';
import { OrderStatus } from 'src/common/enums/orderStatus.enum';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
    @InjectRepository(OrderProduct)
    private readonly orderProductRepository: Repository<OrderProduct>,
    private readonly productsService: ProductsService,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async create(dto: CreateOrderDto, userId: number) {
    await this.productsService.checkIfProductsExist(dto.orderProducts);
    let totalAmount: number = 0;
    dto.orderProducts.forEach((product) => {
      totalAmount += product.product_price * product.product_quantity;
    });
    const order = {
      user_id: userId,
      totalAmount: totalAmount,
      order_product: dto.orderProducts,
    };
    const savedOrder = await this.entityManager.transaction(() => {
      const createdOrder = this.ordersRepository.create(order);
      return this.ordersRepository.save(createdOrder);
    });
    return plainToInstance(GetOrderDto, savedOrder, {
      excludeExtraneousValues: false,
    });
  }

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
      throw new NotFoundException(`Order with id ${id} does not exist`);
    }

    return plainToInstance(GetOrderDto, order, {
      excludeExtraneousValues: false,
    });
  }

  async updateOrderStatus(dto: UpdateOrderStatusDto) {
    const order = await this.ordersRepository.findOne({
      where: { order_id: dto.order_id },
    });
    if (!order) {
      throw new NotFoundException(
        `Order with id ${dto.order_id} does not exist`,
      );
    }
    switch (dto.order_status) {
      case OrderStatus.Processing:
        order.order_status = OrderStatus.Processing;
        break;
      case OrderStatus.Sent:
        order.order_status = OrderStatus.Sent;
        break;
      case OrderStatus.Aborted:
        order.order_status = OrderStatus.Aborted;
        break;
      default:
        order.order_status = OrderStatus.Created;
    }
    await this.ordersRepository.update(dto.order_id, order);
    return {
      message: `Order ${dto.order_id}'s status has been updated to '${order.order_status}' status`,
    };
  }

  async deleteOrder(dto: OrderProductDto) {
    const { order_id } = dto;
    await this.entityManager.transaction(async (transactionalEntityManager) => {
      const orderInOrderProductsTable = await transactionalEntityManager.find(
        OrderProduct,
        {
          where: { order_id },
        },
      );
      if (orderInOrderProductsTable.length < 1) {
        throw new NotFoundException(`Order with id ${order_id} does not exist`);
      }
      const orderInOrdersTable = await transactionalEntityManager.findOne(
        Order,
        {
          where: { order_id: dto.order_id },
        },
      );
      if (!orderInOrdersTable) {
        throw new NotFoundException(`Order with id ${order_id} does not exist`);
      }

      await transactionalEntityManager.remove(orderInOrderProductsTable);
      await transactionalEntityManager.remove(orderInOrdersTable);
    });
    return {
      message: `Order with id ${order_id} is deleted`,
    };
  }
}
