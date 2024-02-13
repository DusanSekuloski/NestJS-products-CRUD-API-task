import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/entities/orders.entity';
import { EntityManager, Repository } from 'typeorm';
import { ProductService } from 'src/product/product.service';
import { OrderProduct } from 'src/entities/order_products.entity';
import { plainToInstance } from 'class-transformer';
import { GetOrderDto } from './dto/getOrderDto';
import { CreateOrderDto } from './dto/createOrderDto';
import { OrderProductDto } from './dto/orderProductDto';
import { UpdateOrderStatusDto } from './dto/updateOrderStatusDto';
import { OrderStatus } from 'src/common/enums/orderStatus.enum';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderProduct)
    private readonly orderProductRepository: Repository<OrderProduct>,
    private readonly productService: ProductService,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async create(dto: CreateOrderDto, userId: number) {
    await this.productService.checkIfProductsExist(dto.orderProducts);
    let totalAmount: number = 0;
    dto.orderProducts.forEach((product) => {
      totalAmount += product.productPrice * product.productQuantity;
    });
    const order = {
      userId: userId,
      totalAmount: totalAmount,
      orderProduct: dto.orderProducts,
    };
    const savedOrder = await this.entityManager.transaction(() => {
      const createdOrder = this.orderRepository.create(order);
      return this.orderRepository.save(createdOrder);
    });
    return plainToInstance(GetOrderDto, savedOrder, {
      excludeExtraneousValues: false,
    });
  }

  async getAll(options) {
    const allOrders = await this.orderRepository.find(options);

    return plainToInstance(GetOrderDto, allOrders, {
      excludeExtraneousValues: false,
    });
  }

  async getById(id: number) {
    const order = await this.orderRepository.findOne({
      where: { orderId: id },
      relations: ['order_products'],
    });

    if (!order) {
      throw new NotFoundException(`Order with id ${id} does not exist`);
    }

    return plainToInstance(GetOrderDto, order, {
      excludeExtraneousValues: false,
    });
  }

  async updateOrderStatus(dto: UpdateOrderStatusDto) {
    const order = await this.orderRepository.findOne({
      where: { orderId: dto.orderId },
    });
    if (!order) {
      throw new NotFoundException(
        `Order with id ${dto.orderId} does not exist`,
      );
    }
    switch (dto.orderStatus) {
      case OrderStatus.Processing:
        order.orderStatus = OrderStatus.Processing;
        break;
      case OrderStatus.Sent:
        order.orderStatus = OrderStatus.Sent;
        break;
      case OrderStatus.Aborted:
        order.orderStatus = OrderStatus.Aborted;
        break;
      default:
        order.orderStatus = OrderStatus.Created;
    }
    await this.orderRepository.update(dto.orderId, order);
    return {
      message: `Order ${dto.orderId}'s status has been updated to '${order.orderStatus}' status`,
    };
  }

  async deleteOrder(dto: OrderProductDto) {
    const { orderId: orderId } = dto;

    const orderInOrderProductsTable = await this.orderProductRepository.find({
      where: { orderId: orderId },
    });

    if (orderInOrderProductsTable.length < 1) {
      throw new NotFoundException(`Order with id ${orderId} does not exist`);
    }

    const orderInOrdersTable = await this.orderRepository.findOne({
      where: { orderId: dto.orderId },
    });

    if (!orderInOrdersTable) {
      throw new NotFoundException(`Order with id ${orderId} does not exist`);
    }

    await this.entityManager.transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager.remove(orderInOrderProductsTable);
      await transactionalEntityManager.remove(orderInOrdersTable);
    });
    return {
      message: `Order with id ${orderId} is deleted`,
    };
  }
}
