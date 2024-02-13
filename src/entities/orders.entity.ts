import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './users.entity';
import { OrderProduct } from './order_products.entity';
import { OrderStatus } from 'src/common/enums/orderStatus.enum';

@Entity('orders')
export class Order {
  constructor(intialData: Partial<Order> = null) {
    if (intialData !== null) {
      Object.assign(this, intialData);
    }
  }
  @PrimaryGeneratedColumn({ name: 'order_id' })
  orderId: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'total_amount', type: 'numeric' })
  totalAmount: number;

  @Column({
    name: 'order_status',
    type: 'varchar',
    default: OrderStatus.Created,
  })
  orderStatus: OrderStatus;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.orders, { nullable: false })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.order, {
    cascade: true,
  })
  orderProduct: OrderProduct[];
}
