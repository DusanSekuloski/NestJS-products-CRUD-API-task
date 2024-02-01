import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Orders } from 'src/entities/orders.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/createOrderDto';
import { Users } from 'src/entities/users.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Orders)
    private readonly ordersRepository: Repository<Orders>,
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const user = await this.userRepository.findOne({
      where: { id: createOrderDto.user_id },
    });

    console.log(user);
    const order = this.ordersRepository.create({
      user: user,
    });
    await this.ordersRepository.save(order);
  }
}
